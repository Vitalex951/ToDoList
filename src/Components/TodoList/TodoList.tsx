import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import ControlButtons from "../ControlButtons/ControlButtons";
import AddTaskForm from "../AddTaskForm/AddTaskForm";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
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
            <TaskList tasks={props.tasks}/>
            <ControlButtons/>
        </div>
    );
};

export default TodoList;