package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/mixpanel-export-sdk/go"
	"github.com/voxgig-sdk/mixpanel-export-sdk/go/core"

	vs "github.com/voxgig-sdk/mixpanel-export-sdk/go/utility/struct"
)

func TestExportEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Export(nil)
		if ent == nil {
			t.Fatal("expected non-nil ExportEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := exportBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "export." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set MIXPANEL_EXPORT_TEST_EXPORT_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		exportRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath(setup.data, "existing.export")))
		var exportRef01Data map[string]any
		if len(exportRef01DataRaw) > 0 {
			exportRef01Data = core.ToMapAny(exportRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = exportRef01Data

		// LOAD
		exportRef01Ent := client.Export(nil)
		exportRef01MatchDt0 := map[string]any{}
		exportRef01DataDt0Loaded, err := exportRef01Ent.Load(exportRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if exportRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func exportBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "export", "ExportTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read export test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse export test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap, _ := vs.Transform(
		[]any{"export01", "export02", "export03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("MIXPANEL_EXPORT_TEST_EXPORT_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"MIXPANEL_EXPORT_TEST_EXPORT_ENTID": idmap,
		"MIXPANEL_EXPORT_TEST_LIVE":      "FALSE",
		"MIXPANEL_EXPORT_TEST_EXPLAIN":   "FALSE",
		"MIXPANEL_EXPORT_APIKEY":         "",
		"MIXPANEL_EXPORT_SERVER_SERVER": "data",
	})

	idmapResolved := core.ToMapAny(env["MIXPANEL_EXPORT_TEST_EXPORT_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["MIXPANEL_EXPORT_TEST_LIVE"] == "TRUE" {
		// An empty map, not a nil one: Merge returns nil when its last entry
		// is nil, and BasicSetup is normally called with no extras - so a
		// bare nil silently discarded the apikey and server values below.
		extraOpts := extra
		if extraOpts == nil {
			extraOpts = map[string]any{}
		}

		mergedOpts := vs.Merge([]any{
			// liveClientOptions() FIRST, so the generated fields below win:
			// sdk-test-control.json's test.client.options adds to the live
			// client, it does not redirect it.
			liveClientOptions(),
			map[string]any{
				"apikey": env["MIXPANEL_EXPORT_APIKEY"],
				"server": map[string]any{
					"server": env["MIXPANEL_EXPORT_SERVER_SERVER"],
				},
			},
			extraOpts,
		})
		client = sdk.NewMixpanelExportSDK(core.ToMapAny(mergedOpts))
	}

	live := env["MIXPANEL_EXPORT_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["MIXPANEL_EXPORT_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
