import {Dispatch} from "redux";
import {AppActionsReducerType, setAppErrorsAC, setAppStatusAC} from "../reducer/app-reducer";
import {ResponseType} from "../../api/todos-api";

export const handlerServerNetworkError = (dispatch: Dispatch<AppActionsReducerType>, message: string) => {
    dispatch(setAppErrorsAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleServerAppError =<T> (dispatch: Dispatch<AppActionsReducerType>, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorsAC(data.messages[0]))
    } else {
        dispatch(setAppErrorsAC('Some error occurred'))
    }
    dispatch(setAppStatusAC("succeeded"))
}