// status === 'loading' показываем крутилку
// status === 'idle' убираем крутилку


//Reducer
import {authAPI, LoginParamsType} from "../../api/todos-api";
import {setAppStatusAC} from "./app-reducer";
import {handlerServerNetworkError, handleServerAppError} from "../utils/error-utils";
import {clearTodoListDataAC} from "./todolistReducer";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false

}

// export const authReducer = (state: InitialStateType = initialState, action: AuthActionsReducerType): InitialStateType => {
//     switch (action.type) {
//         case "LOGIN/SET-IS-LOGGED-IN":
//             return {
//                 ...state,
//                 isLoggedIn: action.value
//             }
//         default:
//             return state
//     }
// }

//ActionCreates
// export const setIsLoggedInAC = (value: boolean) => {
//     return {
//         type: "LOGIN/SET-IS-LOGGED-IN", value
//     } as const
// }



//toolkit

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>) {
            state.isLoggedIn =  action.payload.value
        }
    }
})


export const authReducer = slice.reducer
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC


//Thunk
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    authAPI.login(data)
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: true}))
                } else {
                    handleServerAppError(dispatch, res.data)
                }
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}

export const logOutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    authAPI.logout()
        .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC({value: false}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(clearTodoListDataAC())
                } else {
                    handleServerAppError(dispatch, res.data)
                }
                dispatch(setAppStatusAC({status: 'succeeded'}))
            }
        )
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}


//Types
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
// export type AuthActionsReducerType = setIsLoggedInACType

// type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>



