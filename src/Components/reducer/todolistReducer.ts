import {todolistsAPI, TodolistType} from "../../api/todos-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {handlerServerNetworkError, handleServerAppError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


//reducer
const initialState: Array<TodolistDomainType> = []
// export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListReducerType): Array<TodolistDomainType> => {
//     switch (action.type) {
//         case 'REMOVE-TODOLIST':
//             return state.filter(el => el.id !== action.todoListID)
//         case "CHANGE-FILTER":
//             return state.map(el => el.id === action.todoListID ? {...el, filter: action.filter} : el)
//         case "ADD-TODOLIST":
//             return [
//                 {...action.todoList, filter: "all", entityStatus: "failed"},
//                 ...state,
//             ]
//         case "UPDATE-TODOLIST":
//             return state.map(el => el.id === action.todoListID ? {...el, title: action.title} : el)
//         case "SET-TODOLIST":
//             return action.todos.map(el => ({...el, filter: 'all', entityStatus: "failed"}))
//         case "TODOLIST/CHANGE_STATUS":
//             return state.map(el => el.id === action.todoListID ? {...el, entityStatus: action.status} : el)
//         case "CLEAR-DATA":
//             return []
//         default:
//             return state
//     }
// }


//ActionCreates
// export const removeTodoListAC = (todoListID: string) => {
//     return {
//         type: 'REMOVE-TODOLIST', todoListID
//     } as const
// }
// export const changeFilterAC = (todoListID: string, filter: FilterValuesType) => {
//     return {
//         type: 'CHANGE-FILTER', todoListID, filter
//     } as const
// }
// export const addTodoListAC = (todoList: TodolistType) => {
//     return {
//         type: "ADD-TODOLIST", todoList
//     } as const
// }
// export const updateToDoListAC = (todoListID: string, title: string) => {
//     return {
//         type: 'UPDATE-TODOLIST', todoListID, title
//     } as const
// }
// export const setTodosAC = (todos: TodolistType[]) => {
//     return {
//         type: 'SET-TODOLIST',
//         todos
//     } as const
// }
// export const changeTodoListEnityStatusAC = (todoListID: string, status: RequestStatusType) => {
//     return {
//         type: 'TODOLIST/CHANGE_STATUS', todoListID, status
//     } as const
// }
// export const clearTodoListDataAC = () => {
//     return {
//         type: 'CLEAR-DATA'
//     } as const
// }


//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

// export type TodoListReducerType =
//     removeTodoListACType
//     | changeFilterACType
//     | addTodoListACType
//     | updateToDoListACType
//     | setTodosACType
//     | changeTodoListEnityStatusACType
//     | clearTodoListDataACType
//
// export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
// type changeFilterACType = ReturnType<typeof changeFilterAC>
// export type addTodoListACType = ReturnType<typeof addTodoListAC>
// type updateToDoListACType = ReturnType<typeof updateToDoListAC>
// export type setTodosACType = ReturnType<typeof setTodosAC>
// export type changeTodoListEnityStatusACType = ReturnType<typeof changeTodoListEnityStatusAC>
// export type clearTodoListDataACType = ReturnType<typeof clearTodoListDataAC>


//toolkit

const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListID: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            if (index > -1) state.splice(index, 1)
        },
        changeFilterAC(state, action: PayloadAction<{ todoListID: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].filter = action.payload.filter
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodolistType }>) {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "failed"})
        },
        updateToDoListAC(state, action: PayloadAction<{ todoListID: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            state[index].title = action.payload.title
        },
        setTodoListsAC(state, action: PayloadAction<{ todolist: TodolistType[] }>) {
            return action.payload.todolist.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoListEnityStatusAC(state, action: PayloadAction<{ todoListID: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListID)
            console.log(state[index].entityStatus)
            state[index].entityStatus = action.payload.status
        },
        clearTodoListDataAC() {
            return []
        },

    }
})


export const todolistReducer = slice.reducer
export const {removeTodoListAC, changeFilterAC, addTodoListAC, updateToDoListAC, setTodoListsAC, changeTodoListEnityStatusAC, clearTodoListDataAC} = slice.actions


//Thunks
export const fetchTodosTS = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.getTodolists()
        .then(res => {
            dispatch(setTodoListsAC({todolist: res.data}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}
export const removeTodoListTS = (todolistID: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(changeTodoListEnityStatusAC({todoListID: todolistID, status: "loading"}))
    todolistsAPI.deleteTodolist(todolistID)
        .then(res => {
            if (res.status !== 200) {
                handleServerAppError(dispatch, res.data)
                dispatch(changeTodoListEnityStatusAC({todoListID: todolistID, status: "succeeded"}))
            } else {
                dispatch(removeTodoListAC({todoListID: todolistID}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}
export const addTodoListTS = (title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 1) {
                handleServerAppError(dispatch, res.data)
            } else {
                const newTodolist = res.data.data.item
                dispatch(addTodoListAC({todoList: newTodolist}))
                dispatch(setAppStatusAC({status: "succeeded"}))
            }
        })
        .catch((err) => {
            console.log(err)
            handlerServerNetworkError(dispatch, err.message)
        })
}
export const updateTitleTodoListTS = (todolistID: string, title: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    todolistsAPI.updateTodolist(todolistID, title)
        .then(res => {
            dispatch(updateToDoListAC({todoListID: todolistID, title}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}