import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";
import ControlButtons from "../ControlButtons/ControlButtons";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList = (props: TodoListPropsType) => {

    return (
        <div className='container'>
            <div className='header_div'>
                <ToDoListHeader title={props.title}/>
            </div>
            <div className='add_task'>
                <AddTaskForm addTask={props.addTask}/>
            </div>
            <div className='main'>
                <TaskList
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeFilter={props.changeFilter}
                    changeStatus={props.changeStatus}
                    filter={props.filter}
                />
            </div>
            <div>
                <ControlButtons
                    changeFilter={props.changeFilter}
                    filter={props.filter}/>
            </div>
        </div>
    )
        ;
};

export default TodoList;