import {todolistsAPI, TodolistType} from "../../api/todos-api";
import {ThunkType} from "../store/store";


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
                {...action.todoList, filter: "all"},
                ...state,
            ]
        case "UPDATE-TODOLIST":
            return state.map(el => el.id === action.todoListID ? {...el, title: action.title} : el)
        case "SET-TODOLIST":
            return action.todos.map(el => ({...el, filter: 'all'}))
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


//Thunks
export const fetchTodosTS = (): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.getTodolists()
    dispatch(setTodosAC(res.data))
}
export const removeTodoListTS = (todolistID: string): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.deleteTodolist(todolistID)
    dispatch(removeTodoListAC(todolistID))
}
export const addTodoListTS = (title: string): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.createTodolist(title)
    const newTodolist = res.data.data.item
    dispatch(addTodoListAC(newTodolist))
}
export const updateTitleTodoListTS = (todolistID: string, title: string): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.updateTodolist(todolistID, title)
    dispatch(updateToDoListAC(todolistID, title))
}


//types
export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type TodoListReducerType =
    removeTodoListACType
    | changeFilterACType
    | addTodoListACType
    | updateToDoListACType
    | setTodosActionType

export type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
type updateToDoListACType = ReturnType<typeof updateToDoListAC>
export type setTodosActionType = ReturnType<typeof setTodosAC>


