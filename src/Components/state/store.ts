import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../reducer/taskReducer";
import {todoListReducer} from "../reducer/todolistReducer";
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store