import {todolistsAPI, TodolistType} from "../../api/todos-api";
import {ThunkType} from "../store/store";
import {RequestStatusType, setAppErrorsAC, setAppStatusAC} from "./app-reducer";


//reducer
const initialState: Array<TodolistDomainType> = []
export const todoListReducer = (state: Array<TodolistDomainType> = initialState, action: TodoListReducerType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id !== action.todoListID)
        case "CHANGE-FILTER":
            return state.map(el => el.id === action.todoListID ? {...el, filter: action.filter} : el)
        case "ADD-TODOLIST":
            return [
                {...action.todoList, filter: "all", entityStatus: "failed"},
                ...state,
            ]
        case "UPDATE-TODOLIST":
            return state.map(el => el.id === action.todoListID ? {...el, title: action.title} : el)
        case "SET-TODOLIST":
            return action.todos.map(el => ({...el, filter: 'all', entityStatus: "failed"}))
        case "TODOLIST/CHANGE_STATUS":
            return state.map(el => el.id === action.todoListID ? {...el, entityStatus: action.status} : el)

        default:
            return state
    }
}


//ActionCreates
export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST', todoListID
    } as const
}
export const changeFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER', todoListID, filter
    } as const
}
export const addTodoListAC = (todoList: TodolistType) => {
    return {
        type: "ADD-TODOLIST", todoList
    } as const
}
export const updateToDoListAC = (todoListID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST', todoListID, title
    } as const
}
export const setTodosAC = (todos: TodolistType[]) => {
    return {
        type: 'SET-TODOLIST',
        todos
    } as const
}
export const changeTodoListEnityStatusAC = (todoListID: string, status: RequestStatusType) => {
    return {
        type: 'TODOLIST/CHANGE_STATUS', todoListID, status
    } as const
}

//Thunks
export const fetchTodosTS = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodosAC(res.data))
    dispatch(setAppStatusAC("succeeded"))
}
export const removeTodoListTS = (todolistID: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    dispatch(changeTodoListEnityStatusAC(todolistID, "loading"))
    const res = await todolistsAPI.deleteTodolist(todolistID)
    if (res.status !== 200) {
        dispatch(setAppErrorsAC(res.data.messages[0]))
    } else {
        dispatch(removeTodoListAC(todolistID))
        dispatch(setAppStatusAC("succeeded"))
        dispatch(changeTodoListEnityStatusAC(todolistID, "succeeded"))
    }
}
export const addTodoListTS = (title: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const res = await todolistsAPI.createTodolist(title)
    if (res.data.resultCode === 1) {
        dispatch(setAppErrorsAC(res.data.messages[0]))
        dispatch(setAppStatusAC("idle"))
    } else {
        const newTodolist = res.data.data.item
        dispatch(addTodoListAC(newTodolist))
        dispatch(setAppStatusAC("succeeded"))
    }
}
export const updateTitleTodoListTS = (todolistID: string, title: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const res = await todolistsAPI.updateTodolist(todolistID, title)
    dispatch(updateToDoListAC(todolistID, title))
    dispatch(setAppStatusAC("idle"))
}


//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type TodoListReducerType =
    removeTodoListACType
    | changeFilterACType
    | addTodoListACType
    | updateToDoListACType
    | setTodosACType
    | changeTodoListEnityStatusACType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
type updateToDoListACType = ReturnType<typeof updateToDoListAC>
export type setTodosACType = ReturnType<typeof setTodosAC>
export type changeTodoListEnityStatusACType = ReturnType<typeof changeTodoListEnityStatusAC>


