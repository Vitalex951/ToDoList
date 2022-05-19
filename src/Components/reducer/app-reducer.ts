// status === 'loading' показываем крутилку
// status === 'idle' убираем крутилку


//reducer
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../../api/todos-api";
import {ThunkType} from "../store/store";
import {handlerServerNetworkError, handleServerAppError} from "../utils/error-utils";

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

//ActionCreates
export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: "APP/SET-STATUS", status
    } as const
}
export const setAppErrorsAC = (error: string | null) => {
    return {
        type: "APP/SET-ERROR", error
    } as const
}
export const setAppIsInitializedsAC = (isInitialized: boolean) => {
    return {
        type: "APP/SET-INITIALIZED", isInitialized
    } as const
}

//Thunk
export const initializeAppTC = (): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }
    )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
        .finally(()=> {
            dispatch(setAppIsInitializedsAC(true))
        })
}

//type
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsReducerType = SetAppStatusType | SetAppErrorType | SetAppIsInitializedType

type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type SetAppErrorType = ReturnType<typeof setAppErrorsAC>
type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedsAC>