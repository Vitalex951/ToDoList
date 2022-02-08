import React from 'react';
import {TaskType} from "../TodoList/TodoList";


type TaskPropsType = TaskType & {
    removeTask: (id: number) => void
}


const Task = (props: TaskPropsType) => {
    return (
        <li>
            <input type="checkbox"
                   checked={props.isDone}/>
            <span>{props.title}</span>
            <button onClick={() => props.removeTask(props.id)}>х</button>
        </li>
    );
};

export default Task;