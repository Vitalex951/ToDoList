import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskReducerType, tasksReducer} from "../reducer/taskReducer";
import {todoListReducer, TodoListReducerType} from "../reducer/todolistReducer";
import thunk, {ThunkAction} from "redux-thunk";
import {AppActionsReducerType, appReducer} from "../reducer/app-reducer";
import {AuthActionsReducerType, authReducer} from "../reducer/auth-reducer";


const rootReducer = combineReducers({
    todoLists: todoListReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppActionsType = TaskReducerType | TodoListReducerType | AppActionsReducerType | AuthActionsReducerType

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store