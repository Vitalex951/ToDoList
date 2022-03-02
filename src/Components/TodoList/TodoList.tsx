import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";
import AddTaskForm from "../AddTaskForm/AddTaskForm";
import {FilterValuesType} from "../../App";
import ControlButtons from "../ControlButtons/ControlButtons";
import {Button} from "../Button/Button";

type TodoListPropsType = {
    todoListID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todoListID: string, id: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    filter: FilterValuesType
    removeToDoList: (todoListID: string) => void
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
                <div className='button_deleted_toDolist'>
                    <Button
                        name={'x'}
                        callback={() => props.removeToDoList(props.todoListID)}
                        classname={'removeToDoList'}/>
                </div>
                <ToDoListHeader title={props.title}/>
            </div>
            <div className='add_task'>
                <AddTaskForm
                    addTask={props.addTask}
                    todoListID={props.todoListID}/>
            </div>
            <div className='main'>
                <TaskList
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeStatus={props.changeStatus}
                    filter={props.filter}
                    todoListID={props.todoListID}/>
            </div>
            <div>
                <ControlButtons
                    changeFilter={props.changeFilter}
                    filter={props.filter}
                    todoListID={props.todoListID}/>
            </div>
        </div>
    )
        ;
};

export default TodoList;