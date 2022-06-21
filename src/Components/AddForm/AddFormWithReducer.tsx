import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddTaskFormPropsType = {
    callback: (title: string) => void
    disabled?: boolean
}

export const AddTaskFormWithRedux = React.memo((props: AddTaskFormPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | ''>('')

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }, [title])

    const onClickAddTask = useCallback(() => {
        if (title.trim()) {
            props.callback(title.trim())
            setTitle('')
            if (error !== '') setError('')
        } else {
            setError('Title is required')
        }
    }, [title, props.callback])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickAddTask()
        }
    }, [title])

    return (
        <div>
            <TextField value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       id="standard-basic"
                       label="Type value"
                       variant="standard"
                       error={!!error}
                       helperText={error}
                       disabled={props.disabled}
                // autoComplete='off'
            />
            <IconButton onClick={onClickAddTask} size={"small"} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});