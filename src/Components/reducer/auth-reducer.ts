// status === 'loading' показываем крутилку
// status === 'idle' убираем крутилку


//reducer
import {ThunkType} from "../store/store";
import {authAPI, LoginParamsType} from "../../api/todos-api";
import {setAppStatusAC} from "./app-reducer";
import {handlerServerNetworkError, handleServerAppError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false

}

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsReducerType): InitialStateType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN":
            return {
                ...state,
                isLoggedIn: action.value
            }
        default:
            return state
    }
}

//ActionCreates
export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: "LOGIN/SET-IS-LOGGED-IN", value
    } as const
}

//Thunk
export const loginTC = (data: LoginParamsType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                handleServerAppError(dispatch, res.data)
                }
            dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}

export const logOutTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
                dispatch(setAppStatusAC('succeeded'))
            }
        )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}


//type
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AuthActionsReducerType = setIsLoggedInACType

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>
