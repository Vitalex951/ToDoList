import {TaskObjetType} from "../../App";
import {v1} from "uuid";
import {addTodoListACType, removeTodoListACType, todolistID1, todolistID2} from "./todolistReducer";

const initialState: TaskObjetType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false},
    ]
}

export const tasksReducer = (state: TaskObjetType = initialState, action: taskReducerType): TaskObjetType => {
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
            return {...state, [action.payload.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state}
            delete  stateCopy[action.payload.todoListID]
            return stateCopy
        }
        default:
            return state
    }
}

type taskReducerType = removeTaskACType | changeStatusACType | addTaskACType | updateTitleTaskACType | addTodoListACType | removeTodoListACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type changeStatusACType = ReturnType<typeof changeStatusAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTitleTaskACType = ReturnType<typeof updateTitleTaskAC>

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
export const updateTitleTaskAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: "UPDATE-TITLE",
        payload: {todolistID, taskID, title}
    } as const
}
// export const removeTodoLisTaskAC = (todolistID: string) => {
//     return {
//         type: "ROMOVE-TODOLIST",
//         payload: {todolistID}
//     } as const
// }
