import React, {useEffect} from 'react';
import {TaskWithRedux} from "../Task/TaskWithRedux";
import {useDispatch} from "react-redux";
import {setTasksAC} from "../reducer/taskReducer";
import {TaskType} from "../../api/todos-api";


type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string
}

export const TaskListWithRedux = React.memo(({tasks, todoListID}: TaskListPropsType) => {
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(setTasksAC(todoListID, tasks))
    }, [])
    const tasksComponentsList = tasks?.map(task => {
            return <TaskWithRedux
                key={task.id}
                task={{...task}}
                {...task}
                todoListID={todoListID}
            />
        }
    )

    return (
        <>
            {tasks.length ? <div className="main">
                <ul>
                    {tasksComponentsList}
                </ul>
            </div> : <div className='error-message'> Add please task or change on filter</div>}
        </>

    )
});
