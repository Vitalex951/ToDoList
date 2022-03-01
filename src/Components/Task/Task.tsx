import React, {ChangeEvent} from 'react';
import {TaskType} from "../TodoList/TodoList";
import {Button} from "../Button/Button";


type TaskPropsType = TaskType & {
    removeTask: (id: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}


const Task = (props: TaskPropsType) => {
    const inputChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.id, event.currentTarget.checked)
    }
    return (
        <div className='task'>
            <li>

                <label className="checkbox-other">
                    <input className='checkbox'
                           onChange={inputChangeStatus}
                           type="checkbox"
                           checked={props.isDone}/>
                    <span className={props.isDone ? "is-done" : ''}>{props.title}</span>
                    <div className='button_deleted'>
                    <Button name={'x'}
                            callback={() => props.removeTask(props.id)}
                            classname={''}/>
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