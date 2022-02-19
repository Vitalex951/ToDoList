import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddTaskFormPropsType = {
    addTask: (title: string) => void
    error: string | ''
    setError: (error: string) => void
}

const AddTaskForm = (props: AddTaskFormPropsType) => {

    const [title, setTitle] = useState<string>('')

    const onClickAddTask = () => {
        props.addTask(title)
        setTitle('')

    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        props.setError('')
    }
    const onKeyPressTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickAddTask()
        }
    }
    let classError = (props.error ? 'error' : '')
    return (
        <div>
            <input className={classError}
                   value={title}
                   onChange={onChangeSetTitle}
                   onKeyPress={onKeyPressTitle}
            />
            <button onClick={onClickAddTask}>+</button>
            {props.error && <div className='error-message'> Title is required</div>}
        </div>
    );
};

export default AddTaskForm;

//20-18
//21-30
//21-34 объяснение
//21-50