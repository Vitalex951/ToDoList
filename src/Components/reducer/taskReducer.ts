import {TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todos-api";
import {addTodoListACType, removeTodoListACType, setTodosActionType} from "./todolistReducer";
import {ThunkType} from "../store/store";


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
    const res = await todolistsAPI.getTasks(todolistID)
    dispatch(setTasksAC(todolistID, res.data.items))
}
export const removeTaskTC = (todoListID: string, id: string): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.deleteTask(todoListID, id)
    dispatch(removeTaskAC(todoListID, id))
}
export const addTaskTC = (todoListID: string, title: string): ThunkType => async (dispatch) => {
    const res = await todolistsAPI.createTask(todoListID, title)
    const newTask = res.data.data.item
    dispatch(addTaskAC(newTask))

}
export const updateTaskStatusTC = (task: TaskType): ThunkType => async (dispatch) => {
    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    const res = await todolistsAPI.updateTask(task.todoListId, task.id, model)
    dispatch(updateTaskAC(res.data.data.item))
}

export const updateTaskTitleTC = (task: TaskType): ThunkType => async (dispatch) => {
    const model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline
    }
    const res = await todolistsAPI.updateTask(task.todoListId, task.id, model)
    dispatch(updateTaskAC(res.data.data.item))
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
    | setTodosActionType
    | setTasksACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type updateTitleTaskACType = ReturnType<typeof updateTaskAC>
type setTasksACType = ReturnType<typeof setTasksAC>