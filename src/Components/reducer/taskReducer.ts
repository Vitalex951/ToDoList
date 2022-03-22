import {TaskObjetType} from "../../App";
import {v1} from "uuid";

export const tasksReducer = (state: TaskObjetType, action: taskReducerType): TaskObjetType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].filter(el => el.id !== action.payload.id)
            }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todoListID]: state[action.payload.todoListID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {
                ...state,
                [action.payload.todoListID]: [newTask,
                    ...state[action.payload.todoListID]]
            }
        }
        case "UPDATE-TITLE": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskID ? {
                    ...el,
                    title: action.payload.title
                } : el)
            }
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.newId]: []}
        }
        default:
            return state
    }
}

type taskReducerType = removeTaskACType | changeStatusACType | addTaskACType | updateTitleTaskACType | addTodoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTitleTaskACType = ReturnType<typeof updateTitleTaskAC>
type addTodoListACType = ReturnType<typeof addEmptyTaskAC>

export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {todoListID, id}
    } as const
}
export const changeStatusAC = (todoListID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS",
        payload: {todoListID, taskID, isDone}
    } as const
}
export const addTaskAC = (todoListID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {todoListID, title}
    } as const
}
export const addEmptyTaskAC = (newId: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {newId}
    } as const
}
export const updateTitleTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: "UPDATE-TITLE",
        payload: {todolistID, taskID, title}
    } as const
}
