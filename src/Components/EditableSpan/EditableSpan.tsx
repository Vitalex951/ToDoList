import React, {ChangeEvent, useState} from 'react';
import s from './EditableSpan.module.css'

type EditableSpanPropsType = {
    oldTitle: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
    const [edit, setEdit] = useState<boolean>(false)
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onBlurHandler = () => {
        props.callback(newTitle)
        setEdit(false)
    }

    const onDoubleClickHandler = () => {
        setEdit(true)
    }
    return (
        edit ? <input value={newTitle} className={s.input} onChange={onChangeHandler} onBlur={onBlurHandler} autoFocus/> :
            <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>


    );
};