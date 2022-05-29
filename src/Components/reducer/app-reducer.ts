// status === 'loading' показываем крутилку
// status === 'idle' убираем крутилку


//reducer
import {setIsLoggedInAC} from "./auth-reducer";
import {authAPI} from "../../api/todos-api";
import {handlerServerNetworkError, handleServerAppError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    //крутилка под верхним баннером
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    //крутилка всей страницы
    isInitialized: false
}
// export const appReducer = (state: InitialStateType = initialState, action: AppActionsReducerType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case "APP/SET-ERROR":
//             return {...state, error: action.error}
//         case "APP/SET-INITIALIZED":
//             return {...state, isInitialized: action.isInitialized}
//         default:
//             return state
//     }
// }

//ActionCreates
// export const setAppStatusAC = (status: RequestStatusType) => {
//     return {
//         type: "APP/SET-STATUS", status
//     } as const
// }
// export const setAppErrorsAC = (error: string | null) => {
//     return {
//         type: "APP/SET-ERROR", error
//     } as const
// }
// export const setAppIsInitializedsAC = (isInitialized: boolean) => {
//     return {
//         type: "APP/SET-INITIALIZED", isInitialized
//     } as const
// }


//type
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type AppActionsReducerType = SetAppStatusType | SetAppErrorType | SetAppIsInitializedType
//
// type SetAppStatusType = ReturnType<typeof setAppStatusAC>
// type SetAppErrorType = ReturnType<typeof setAppErrorsAC>
// type SetAppIsInitializedType = ReturnType<typeof setAppIsInitializedsAC>


//toolkit

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
        setAppErrorsAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppIsInitializedsAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
    }

})

export const appReducer = slice.reducer

export const {setAppStatusAC, setAppIsInitializedsAC, setAppErrorsAC} = slice.actions
//Thunk
export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.me().then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
                // dispatch(setAppStatus AC('succeeded'))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        }
    )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(setAppIsInitializedsAC({isInitialized: true}))
        })
}