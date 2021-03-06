import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddTaskFormPropsType = {
    callback: (title: string) => void
}

export const AddTaskForm = React.memo((props: AddTaskFormPropsType) => {
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
            setError('')
        } else {
            // dispatch(setAppErrorsAC('Title is maximum length of 100 '))
            setError('Title is required')
            setTitle('')
        }
    }, [title])
    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            onClickAddTask()
        }
    }, [title])


    // let classError = (error ? 'input-add error' : 'input-add')
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
            />
            <IconButton onClick={onClickAddTask} size={"small"}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
