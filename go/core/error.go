package core

type NycOpenDataError struct {
	IsNycOpenDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewNycOpenDataError(code string, msg string, ctx *Context) *NycOpenDataError {
	return &NycOpenDataError{
		IsNycOpenDataError: true,
		Sdk:              "NycOpenData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *NycOpenDataError) Error() string {
	return e.Msg
}
