import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    error: string | ''
    setError: (error: string) => void
    filter: FilterValuesType
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <AddTaskForm
                addTask={props.addTask}
                error={props.error}
                setError={props.setError}
            />
            <TaskList
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeFilter={props.changeFilter}
                changeStatus={props.changeStatus}
                filter = {props.filter}

            />
        </div>
    );
};

export default TodoList;