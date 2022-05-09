import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducerType, tasksReducer} from "../reducer/taskReducer";
import {todoListReducer, TodoListReducerType} from "../reducer/todolistReducer";
import thunk, {ThunkAction} from "redux-thunk";


const rootReducer = combineReducers({
    todolists: todoListReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TaskReducerType | TodoListReducerType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store