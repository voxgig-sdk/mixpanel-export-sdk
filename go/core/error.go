package core

type MixpanelExportError struct {
	IsMixpanelExportError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewMixpanelExportError(code string, msg string, ctx *Context) *MixpanelExportError {
	return &MixpanelExportError{
		IsMixpanelExportError: true,
		Sdk:              "MixpanelExport",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *MixpanelExportError) Error() string {
	return e.Msg
}
