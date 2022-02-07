import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValueType} from "../../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
}


export type TaskType = {
    id: number
    title: string
    isDone: boolean
    changeFilter: (filter: FilterValueType) => void
}

const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <AddTaskForm/>
            <TaskList tasks={props.tasks} removeTask={props.removeTask} changeFilter={props.}/>
        </div>
    );
};

export default TodoList;