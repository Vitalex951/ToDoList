import {TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todos-api";
import {addTodoListACType, clearTodoListDataACType, removeTodoListACType, setTodosACType} from "./todolistReducer";
import {ThunkType} from "../store/store";
import {setAppErrorsAC, setAppStatusAC} from "./app-reducer";
import {handlerServerNetworkError} from "../utils/error-utils";


//reducer
const initialState: TaskObjetType = {}
export const tasksReducer = (state: TaskObjetType = initialState, action: TaskReducerType): TaskObjetType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.id)
            }
        case "ADD-TASK":
            return {
                ...state,
                [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]
            }
        case "UPDATE-TASK":
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId]
                    .map(el => el.id === action.task.id ? {...action.task} : el)
            }

        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todoList.id]: []
            }

        case "REMOVE-TODOLIST":
            const stateCopy = {...state}
            delete stateCopy[action.todoListID]
            return stateCopy
        case "SET-TODOLIST": {
            const statecopy = {...state}
            action.todos.forEach(el => {
                statecopy[el.id] = []
            })
            return statecopy
        }
        case "SET-TASKS":
            return {
                ...state,
                [action.todolistID]: action.tasks
            }
        case "CLEAR-DATA":
            return {}
        default:
            return state
    }
}


//ActionCreates
export const removeTaskAC = (todoListID: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        todoListID, id
    } as const
}
export const addTaskAC = (newTask: TaskType) => {
    return {
        type: "ADD-TASK",
        newTask
    } as const
}
export const updateTaskAC = (task: TaskType) => {
    return {
        type: "UPDATE-TASK",
        task
    } as const
}
export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        todolistID, tasks
    } as const
}


//Thunks
export const fetchTasksTC = (todolistID: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC(todolistID, res.data.items))
            dispatch(setAppStatusAC("succeeded"))
        })
}
export const removeTaskTC = (todoListID: string, id: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    todolistsAPI.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTaskAC(todoListID, id))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}

// add enum + try-catch
enum ResultCodeStatuses {
    'success',
    'error',
    'captcha'
}

export const addTaskTC = (todoListID: string, title: string): ThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatusAC("loading"))
        const res = await todolistsAPI.createTask(todoListID, title)
        if (res.data.resultCode === ResultCodeStatuses.error) {
            dispatch(setAppErrorsAC(res.data.messages[0]))
            dispatch(setAppStatusAC("succeeded"))

        } else {
            const newTask = res.data.data.item
            dispatch(addTaskAC(newTask))
            dispatch(setAppStatusAC("succeeded"))

        }

    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppErrorsAC(error.name))
            dispatch(setAppStatusAC("succeeded"))
        }
    }
}
export const updateTaskStatusTC = (task: TaskType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    todolistsAPI.updateTask(task.todoListId, task.id, model)
        .then(res => {
            dispatch(updateTaskAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}
export const updateTaskTitleTC = (task: TaskType): ThunkType => (dispatch) => {
    dispatch(setAppStatusAC("loading"))
    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    todolistsAPI.updateTask(task.todoListId, task.id, model)
        .then(res => {
            dispatch(updateTaskAC(res.data.data.item))
            dispatch(setAppStatusAC("succeeded"))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
}
//get store
// export const updateTaskStatusTC = (task: TaskType) => {
//     return (dispatch: Dispatch, getState: () => AppRootStateType) => {
//         const store = getState()
//         const allAppTasks = store.tasks
//         const tasksForClickedTodo = allAppTasks[todoListID]
//         const currentTask = tasksForClickedTodo.find(t => t.taskID === taskID)
//
//         todolistsAPI.updateTask(todoListID, taskID, status)
//             .then(res => {
//                 const newTask = res.data.data.item
//             })
//     }
// }


//types
export type TaskObjetType = {
    [key: string]: Array<TaskType>
}

export type TaskReducerType =
    removeTaskACType
    | addTaskACType
    | updateTitleTaskACType
    | addTodoListACType
    | removeTodoListACType
    | setTodosACType
    | setTasksACType
    | clearTodoListDataACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTitleTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>

