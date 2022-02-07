import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
<<<<<<< HEAD
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValueType} from "../../App";
=======
>>>>>>> origin/main

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
<<<<<<< HEAD
            <AddTaskForm/>
            <TaskList tasks={props.tasks} removeTask={props.removeTask} changeFilter={props.}/>
=======
            <TaskList tasks={props.tasks}/>
>>>>>>> origin/main
        </div>
    );
};

export default TodoList;