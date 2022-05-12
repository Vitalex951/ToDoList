// status === 'loading' показываем крутилку
// status === 'idle' убираем крутилку


//reducer
const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null
}
export const appReducer = (state: InitialStateType = initialState, action: AppActionsReducerType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
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

//type
type InitialStateType = typeof initialState

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type AppActionsReducerType = SetAppStatusType | SetAppErrorType

type SetAppStatusType = ReturnType<typeof setAppStatusAC>
type SetAppErrorType = ReturnType<typeof setAppErrorsAC>