import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../Components/state/state";
import {Story} from "@storybook/react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../Components/reducer/taskReducer";
import {v1} from "uuid";
import {todoListReducer} from "../Components/reducer/todolistReducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todolistId1"]: [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (StoryFn: Story) => {
    return (
        <Provider store={storyBookStore}><StoryFn/></Provider>
    );
};
