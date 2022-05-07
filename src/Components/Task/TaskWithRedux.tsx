import React, {ChangeEvent, useCallback} from 'react';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import {removeTaskTC, updateTaskStatusTC, updateTaskTitleTC} from "../reducer/taskReducer";
import {TaskStatuses, TaskType} from "../../api/todos-api";


export type TaskPropsType = TaskType & {
    id: string
    title: string
    todoListID: string
    task: TaskType
}


export const TaskWithRedux = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()

    const inputChangeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTaskStatusTC({
            ...props.task,
            status: (event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New)
        }))
    }, [props.todoListID, props.id])

    const updateTitleTask = useCallback((title: string) => {
        dispatch(updateTaskTitleTC({...props.task, title}))
    }, [props.todoListID, props.id])

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todoListID, props.id))
    }, [props.todoListID, props.id])

    return (
        <div className='task'>
            <li>
                <label className="checkbox-other">
                    <div className='labelcontainer'>

                        <Checkbox onChange={inputChangeStatus} checked={props.status === TaskStatuses.Completed}/>
                        <EditableSpan
                            oldTitle={props.task.title}
                            callback={updateTitleTask}/>

                        <IconButton onClick={removeTask} size={"small"}>
                            <Delete/>
                        </IconButton>

                    </div>
                </label>

            </li>
        </div>
    );
});