import React, {ChangeEvent, useCallback} from 'react';
import {TaskType} from "../TodoList/TodoList";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {changeStatusAC, removeTaskAC, updateTitleTaskAC} from "../reducer/taskReducer";


type TaskPropsType = TaskType & {
    id: string
    title: string
    todoListID: string
}


export const TaskWithRedux = React.memo((props: TaskPropsType) => {
    console.log('TaskWithRedux')
    const dispatch = useDispatch()

    const inputChangeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusAC(props.todoListID, props.id, event.currentTarget.checked))
    }, [props.todoListID, props.id])
    const updateTitleTask = useCallback((title: string) => {
        dispatch(updateTitleTaskAC(props.todoListID, props.id, title))
    }, [props.todoListID, props.id])
    const removeTask = useCallback(() => {
        dispatch(removeTaskAC(props.todoListID, props.id))
    }, [props.todoListID, props.id])

    return (
        <div className='task'>
            <li>
                <label className="checkbox-other">
                    <div className='labelcontainer'>

                        <Checkbox onChange={inputChangeStatus} checked={props.isDone}/>
                        <EditableSpan oldTitle={props.title} callback={updateTitleTask}/>

                        <IconButton onClick={removeTask} size={"small"}>
                            <Delete/>
                        </IconButton>

                    </div>
                </label>

            </li>
        </div>
    );
});