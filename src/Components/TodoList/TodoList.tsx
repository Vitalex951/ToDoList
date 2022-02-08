import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}


export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <AddTaskForm/>
            <TaskList
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeFilter={props.changeFilter}
               />
        </div>
    );
};

export default TodoList;