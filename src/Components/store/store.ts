import {combineReducers} from "redux";
import {todolistReducer} from "../reducer/todolistReducer";
import thunk from "redux-thunk";
import {appReducer} from "../reducer/app-reducer";
import {authReducer} from "../reducer/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {tasksReducer} from "../reducer/taskReducer";


const rootReducer = combineReducers({
    todoLists: todolistReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

// export const store = createStore(rootReducer, applyMiddleware(thunk))
//toolkit
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>
//
// export type AppActionsType = TaskReducerType | TodoListReducerType
//
// export type ThunkType = ThunkAction<void, AppRootStateType, unknown, AppActionsType>


// @ts-ignore
window.store = store