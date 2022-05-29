import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../api/todos-api";
import {setAppErrorsAC, setAppStatusAC} from "./app-reducer";
import {handlerServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {addTodoListAC, clearTodoListDataAC, removeTodoListAC, setTodoListsAC} from "./todolistReducer";


//reducer
const initialState: TaskObjetType = {}
// export const tasksReducer = (state: TaskObjetType = initialState, action: TaskReducerType): TaskObjetType => {
//     switch (action.type) {
//         case "REMOVE-TASK":
//             return {
//                 ...state,
//                 [action.todoListID]: state[action.todoListID].filter(el => el.id !== action.id)
//             }
//         case "ADD-TASK":
//             return {
//                 ...state,
//                 [action.newTask.todoListId]: [action.newTask, ...state[action.newTask.todoListId]]
//             }
//         case "UPDATE-TASK":
//             return {
//                 ...state,
//                 [action.task.todoListId]: state[action.task.todoListId]
//                     .map(el => el.id === action.task.id ? {...action.task} : el)
//             }
//
//         case "ADD-TODOLIST":
//             return {
//                 ...state,
//                 [action.todoList.id]: []
//             }
//
//         case "REMOVE-TODOLIST":
//             const stateCopy = {...state}
//             delete stateCopy[action.todoListID]
//             return stateCopy
//         case "SET-TODOLIST": {
//             const statecopy = {...state}
//             action.todos.forEach(el => {
//                 statecopy[el.id] = []
//             })
//             return statecopy
//         }
//         case "SET-TASKS":
//             return {
//                 ...state,
//                 [action.todolistID]: action.tasks
//             }
//         case "CLEAR-DATA":
//             return {}
//         default:
//             return state
//     }
// }


//ActionCreates
// export const removeTaskAC = (todoListID: string, id: string) => {
//     return {
//         type: "REMOVE-TASK",
//         todoListID, id
//     } as const
// }
// export const addTaskAC = (newTask: TaskType) => {
//     return {
//         type: "ADD-TASK",
//         newTask
//     } as const
// }
// export const updateTaskAC = (task: TaskType) => {
//     return {
//         type: "UPDATE-TASK",
//         task
//     } as const
// }
// export const setTasksAC = (todolistID: string, tasks: TaskType[]) => {
//     return {
//         type: "SET-TASKS",
//         todolistID, tasks
//     } as const
// }

// add enum + try-catch
enum ResultCodeStatuses {
    'success',
    'error',
    'captcha'
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

export type newTaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
    // entityStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
    entityStatus: string
}
export type TaskObjetType = {
    [key: string]: Array<newTaskType>
}

// export type TaskReducerType =
//     removeTaskACType
//     | addTaskACType
//     | updateTitleTaskACType
//     | addTodoListACType
//     | removeTodoListACType
//     | setTodosACType
//     | setTasksACType
//     | clearTodoListDataACType
//
// type removeTaskACType = ReturnType<typeof removeTaskAC>
// type addTaskACType = ReturnType<typeof addTaskAC>
// type updateTitleTaskACType = ReturnType<typeof updateTaskAC>
// type setTasksACType = ReturnType<typeof setTasksAC>


//toolkit
const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoListID: string, id: string }>) {
            const index = state[action.payload.todoListID].findIndex(tk => tk.id === action.payload.id)
            if (index > -1) state[action.payload.todoListID].splice(index, 1)
        },
        addTaskAC(state, action: PayloadAction<{ newTask: newTaskType }>) {
            state[action.payload.newTask.todoListId] = [action.payload.newTask, ...state[action.payload.newTask.todoListId]]
        },
        updateTaskAC(state, action: PayloadAction<{ task: newTaskType }>) {
            const index = state[action.payload.task.todoListId].findIndex(tk => tk.id === action.payload.task.id)
            if (index > -1) state[action.payload.task.todoListId][index] = {...action.payload.task}
        },
        updateTaskStatusAC(state, action: PayloadAction<{ todoListID: string, id: string, status: string }>) {
            const index = state[action.payload.todoListID].findIndex(tk => tk.id === action.payload.id)
            if (index > -1) state[action.payload.todoListID][index] = {
                ...state[action.payload.todoListID][index],
                entityStatus: action.payload.status
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) {
            const newTasks = action.payload.tasks.map(el => ({...el, entityStatus: 'succeeded'}))
            state[action.payload.todolistID] = newTasks
        },
    },
    extraReducers: (builder => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListID]
        });
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todolist.forEach(el => {
                state[el.id] = []
            })
        });
        builder.addCase(clearTodoListDataAC, () => {
            return {}
        })
    })
})


export const tasksReducer = slice.reducer
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC, updateTaskStatusAC} = slice.actions


//Thunks
export const fetchTasksTC = (todolistID: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todolistsAPI.getTasks(todolistID)
        .then(res => {
            dispatch(setTasksAC({tasks: res.data.items, todolistID: todolistID}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
}
export const removeTaskTC = (todoListID: string, id: string) => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(updateTaskStatusAC({todoListID, id, status: 'loading'}))

    todolistsAPI.deleteTask(todoListID, id)
        .then(res => {
            dispatch(removeTaskAC({id, todoListID}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        }).finally(() => {
        dispatch(updateTaskStatusAC({todoListID, id, status: 'succeeded'}))
    })
}
export const addTaskTC = (todoListID: string, title: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todolistsAPI.createTask(todoListID, title)
        if (res.data.resultCode === ResultCodeStatuses.error) {
            dispatch(setAppErrorsAC({error: res.data.messages[0]}))
            dispatch(setAppStatusAC({status: "succeeded"}))

        } else {
            const newTask = {...res.data.data.item, entityStatus: 'succeeded'}
            dispatch(addTaskAC({newTask}))
            dispatch(setAppStatusAC({status: "succeeded"}))

        }

    } catch (error) {
        if (error instanceof Error) {
            dispatch(setAppErrorsAC({error: error.name}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        }
    }
}
export const updateTaskStatusTC = (task: TaskType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(updateTaskStatusAC({todoListID: task.todoListId, id: task.id, status: 'loading'}))
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
            dispatch(updateTaskAC({task: {...res.data.data.item, entityStatus: 'succeeded'}}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(updateTaskStatusAC({todoListID: task.todoListId, id: task.id, status: 'succeeded'}))
        })
}

export const updateTaskTitleTC = (task: TaskType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: "loading"}))
    dispatch(updateTaskStatusAC({todoListID: task.todoListId, id: task.id, status: 'loading'}))
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
            dispatch(updateTaskAC({task: {...res.data.data.item, entityStatus: 'succeeded'}}))
            dispatch(setAppStatusAC({status: "succeeded"}))
        })
        .catch(err => {
            handlerServerNetworkError(dispatch, err.message)
        })
        .finally(() => {
            dispatch(updateTaskStatusAC({todoListID: task.todoListId, id: task.id, status: 'succeeded'}))
        })
}
