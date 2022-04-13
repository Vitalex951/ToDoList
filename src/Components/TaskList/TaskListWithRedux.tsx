import React from 'react';
import {TaskType} from "../TodoList/TodoList";
import {TaskWithRedux} from "../Task/TaskWithRedux";


type TaskListPropsType = {
    tasks: Array<TaskType>
    todoListID: string

}

export  const TaskListWithRedux = React.memo((props: TaskListPropsType) => {
    console.log('TaskListWithRedux')
        const tasksComponentsList = props.tasks.map(task => {
                return <TaskWithRedux key={task.id}
                             {...task}
                            todoListID={props.todoListID}

                />
            }
        )

        return (
            <>
                {props.tasks.length ? <div className="main">
                    <ul>
                        {tasksComponentsList}
                    </ul>
                </div> : <div className='error-message'> Add please task or change on filter</div>}
            </>

        )
    });
