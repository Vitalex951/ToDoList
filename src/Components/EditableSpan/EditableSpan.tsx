import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './EditableSpan.module.css'
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }, [])
    const onBlurHandler = useCallback(() => {
        props.callback(newTitle)
        setEdit(false)
    }, [])

    const onDoubleClickHandler = () => {
        setEdit(true)
    }
    return (
        edit ? <TextField value={newTitle}
                          className={s.input} onChange={onChangeHandler} onBlur={onBlurHandler}
                          autoFocus
                          variant="standard"/>
            : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>


    );
});