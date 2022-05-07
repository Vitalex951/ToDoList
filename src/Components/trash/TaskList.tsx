import React from 'react';
import Task from "./Task";
import {FilterValuesType} from "../../app/App";
import {TaskStatuses, TaskType} from "../../api/todos-api";


type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (todoListID: string, id: string) => void
    changeStatus: (todoListID: string, taskID: string, status: TaskStatuses) => void
    filter: FilterValuesType
    todoListID: string
    updateTitleTask: (taskID: string, title: string) => void
}

const TaskList = (props: TaskListPropsType) => {
        const updateTitleTask = (taskID: string, title: string) => {
            props.updateTitleTask(taskID, title)
        }
        const tasksComponentsList = props.tasks.map(task => {
                return <Task key={task.id}
                    // title={task.title}
                    // id={task.id}
                             {...task}
                             changeStatus={props.changeStatus}
                             removeTask={props.removeTask}
                             todoListID={props.todoListID}
                             updateTitleTask={updateTitleTask}/>
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
    }
;

export default TaskList;


{/*<Task {...props.tasks[0]}/>*/
}

{/*         <Task {...props.tasks[1]}/>*/
}


{/*         <Task id={} title={} isDone={} />*/
}

{/*         <Task*/
}
{/*             id={props.tasks[2].id}*/
}
{/*             title={props.tasks[2].title}*/
}
{/*             isDone={props.tasks[2].isDone}/>*/
}


{/*</ul>*/
}
{/*<ControlButtons/>*/
}