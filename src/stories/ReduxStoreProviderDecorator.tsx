import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../Components/store/store";
import {Story} from "@storybook/react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../Components/reducer/taskReducer";
import {todoListReducer} from "../Components/reducer/todolistReducer";
import {TaskPriorities, TaskStatuses} from "../api/todos-api";
import {appReducer} from "../Components/reducer/app-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todoLists: todoListReducer,
    app: appReducer
})

const initialGlobalState: AppRootStateType = {
    tasks: {
        ["todolistID1"]: [
            {
                id: '1',
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '4',
                title: "Rest API",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '5',
                title: "GraphQL",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ],
        ["todolistID2"]: [
            {
                id: '1',
                title: "HTML&CSS2",
                status: TaskStatuses.Completed,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '2',
                title: "JS2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '3',
                title: "ReactJS2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '4',
                title: "Rest API2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: '5',
                title: "GraphQL2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low
            },
        ]
    },
    todoLists: [{
        id: "todolistID1",
        title: 'What to learn',
        addedDate: '',
        order: 3,
        filter: 'all',
        entityStatus: "succeeded"
    },
        {id: "todolistID2", title: 'What to buy', addedDate: '', order: 3, filter: 'all', entityStatus: "succeeded"},],
    app: {
        status: 'loading',
        error: 'error-super',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }

};

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (StoryFn: Story) => {
    return (
        <Provider store={storyBookStore}><StoryFn/></Provider>
    );
};
