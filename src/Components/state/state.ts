import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducer/taskReducer";
import {todoListReducer} from "../reducer/todolistReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store