import React, {ChangeEvent} from 'react';
import {TaskType} from "../TodoList/TodoList";
import {Button} from "../Button/Button";
import {EditableSpan} from "../EditableSpan/EditableSpan";


type TaskPropsType = TaskType & {
    id: string
    title: string
    removeTask: (todoListID: string, id: string) => void
    changeStatus: (todoListID: string, taskID: string, isDone: boolean) => void
    todoListID: string
    updateTitleTask: (taskID: string, title: string) => void
}


const Task = (props: TaskPropsType) => {
    const inputChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatus(props.todoListID, props.id, event.currentTarget.checked)
    }
    const updateTitleToDolist = (title: string) => {
        props.updateTitleTask(props.id, title)
    }
    return (
        <div className='task'>
            <li>

                <label className="checkbox-other">
                    <input className='checkbox'
                           onChange={inputChangeStatus}
                           type="checkbox"
                           checked={props.isDone}/>
                    {/*<span className={props.isDone ? "is-done" : ''}>{props.title}</span>*/}
                   <EditableSpan oldTitle={props.title} callback={updateTitleToDolist} />
                    <div className='button_deleted'>
                        <Button name={'x'}
                                callback={() => props.removeTask(props.todoListID, props.id)}
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