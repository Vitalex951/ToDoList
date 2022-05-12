import {Dispatch} from "redux";
import {AppActionsReducerType, setAppErrorsAC, setAppStatusAC} from "../reducer/app-reducer";

export const handlerServerNetworkError = (dispatch: Dispatch<AppActionsReducerType>, message: string) => {
    dispatch(setAppErrorsAC(message))
    dispatch(setAppStatusAC('failed'))
}