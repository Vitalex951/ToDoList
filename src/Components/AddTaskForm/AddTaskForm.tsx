import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

type AddTaskFormPropsType = {
    callback: (title: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | ''>('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onClickAddTask = () => {
        if (title.trim()) {
            props.callback(title.trim())
            setTitle('')
            setError('')
        } else {
            setError('Error')
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickAddTask()
        }
    }


    let classError = (error ? 'input-add error' : 'input-add')
    return (
        <div>
            <input
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                className={classError}
            />
            <button onClick={onClickAddTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddTaskForm;