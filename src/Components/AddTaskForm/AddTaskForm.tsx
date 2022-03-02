import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

type AddTaskFormPropsType = {
    todoListID: string
    addTask: (taskId: string, title: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | ''>('')
    const onClickAddTask = () => {
        if (title.trim()) {
            props.addTask(props.todoListID, title.trim())
            setTitle('')
            setError('')
        } else {
            setError('Error')
        }
    }

    let classError = (error ? 'input-add error' : 'input-add')
    return (
        <div>
            <Input className={classError}
                   title={title}
                   setError={setError}
                   setTitle={setTitle}
                   onClickAddTask={onClickAddTask}/>
            <Button classname={'button9'}
                    name={'add'}
                    callback={onClickAddTask}/>
            {error && <div className='error-message'> Title is required</div>}
        </div>
    );
};

export default AddTaskForm;

//20-18
//21-30
//21-34 объяснение
//21-50