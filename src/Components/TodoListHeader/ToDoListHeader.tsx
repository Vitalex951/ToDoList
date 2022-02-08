import React from 'react';
import AddTaskForm from "../AddTaskForm/AddTaskForm";

type ToDoListHeaderPropsType = {
    title: string
}

const ToDoListHeader = (props: ToDoListHeaderPropsType) => {
    return (
        <>
            <h3>{props.title}</h3>
        </>
    );
};

export default ToDoListHeader;