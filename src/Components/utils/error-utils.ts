import {Dispatch} from "redux";
import {setAppErrorsAC, setAppStatusAC} from "../reducer/app-reducer";
import {ResponseType} from "../../api/todos-api";

export const handlerServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorsAC({error: message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerAppError =<T> (dispatch: Dispatch, data: ResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setAppErrorsAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorsAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'succeeded'}))
}