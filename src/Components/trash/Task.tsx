import React, {ChangeEvent} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todos-api";


type TaskPropsType = TaskType & {
    id: string
    title: string
    removeTask: (todoListID: string, id: string) => void
    changeStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    todoListID: string
    updateTitleTask: (taskID: string, title: string) => void
}


const Task = (props: TaskPropsType) => {
    const inputChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todoListID, props.id, event.currentTarget.checked? TaskStatuses.Completed: TaskStatuses.New)
    }
    const updateTitleToDolist = (title: string) => {
        props.updateTitleTask(props.id, title)
    }
    const removeTask = () => {
        props.removeTask(props.todoListID, props.id)
    }
    return (
        <div className='task'>
            <li>
                <label className="checkbox-other">
                    <div className='labelcontainer'>
                        {/*<input className='checkbox'*/}
                        {/*       onChange={inputChangeStatus}*/}
                        {/*       type="checkbox"*/}
                        {/*       checked={props.isDone}/>*/}
                        <Checkbox onChange={inputChangeStatus} checked={props.status === TaskStatuses.Completed}/>
                        <EditableSpan oldTitle={props.title} callback={updateTitleToDolist}/>

                        {/*/!*<div className='button_deleted'>*!/*/}
                        {/*<ButtonMy name={'x'}*/}
                        {/*          callback={removeTask}*/}
                        {/*          classname={''}/>*/}
                        <IconButton onClick={removeTask} size={"small"}>
                            <Delete/>
                        </IconButton>

                    </div>
                </label>
                {/*<input*/}
                {/*    className='checkbox'*/}
                {/*    onChange={inputChangeStatus}*/}
                {/*    type="checkbox"*/}
                {/*    checked={props.isDone}/>*/}
                {/*<span className={props.isDone ? "is-done" : ''}>{props.title}</span>*/}
                {/*<Button name={'x'}*/}
                {/*        callback={() => props.removeTask(props.id)}*/}
                {/*        classname={''}/>*/}

            </li>
        </div>
    );
};

export default Task;