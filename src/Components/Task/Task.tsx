import React, {ChangeEvent} from 'react';
import {TaskType} from "../TodoList/TodoList";


type TaskPropsType = TaskType & {
    removeTask: (id: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


const Task = (props: TaskPropsType) => {
    const inputChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.id, event.currentTarget.checked)
    }
    return (
        <li className={props.isDone? "is-done": ''}>
            <input
                                onChange={inputChangeStatus}
                   type="checkbox"
                   checked={props.isDone}/>
            <span>{props.title}</span>

            <button onClick={() => props.removeTask(props.id)}>х</button>

        </li>
    );
};

export default Task;