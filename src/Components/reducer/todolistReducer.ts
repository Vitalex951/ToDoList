import {FilterValuesType, TodolistsType} from "../../App";

export const todoListReducer = (state: Array<TodolistsType>, action: todoListReducerType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.todoListID)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todoListID ? {...el, filter: action.payload.filter} : el)
        }
        case "ADD-TODOLIST": {
            return [
                ...state,
                {
                    id: action.payload.id,
                    title: action.payload.title,
                    filter: "all"
                }]
        }
        case "UPDATE-TODOLIST": {
            return state.map(el => el.id === action.payload.todoListID ? {...el, title: action.payload.title} : el)
        }
        default:
            return state
    }
}

type todoListReducerType = removeTodoListACType | changeFilterACType | addTodoListACType | updateToDoListACType
type removeTodoListACType = ReturnType<typeof removeTodoListAC>
type changeFilterACType = ReturnType<typeof changeFilterAC>
type addTodoListACType = ReturnType<typeof addTodoListAC>
type updateToDoListACType = ReturnType<typeof updateToDoListAC>

export const removeTodoListAC = (todoListID: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todoListID}
    } as const
}
export const changeFilterAC = (todoListID: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {todoListID, filter}
    } as const
}
export const addTodoListAC = (id: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {id, title}
    } as const
}
export const updateToDoListAC = (todoListID: string, title: string) => {
    return {
        type: 'UPDATE-TODOLIST',
        payload: {todoListID, title}
    } as const
}



