import React from 'react';
import Task from "../Task/Task";
import {TaskType} from "../TodoList/TodoList";
import ControlButtons from "../ControlButtons/ControlButtons";
import {FilterValuesType} from "../../App";


type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    changeStatus: (taskId: string, isDone: boolean) => void
    filter: FilterValuesType
}

const TaskList = (props: TaskListPropsType) => {

    const tasksComponentsList = props.tasks.map(task => {
            return <Task key={task.id}  {...task} changeStatus ={props.changeStatus} removeTask={props.removeTask}/>
        }
    ) /* <Task key={task.id} {...task} /!*removeTask={props.removeTask}*!//>*/
    return (
        <>
            <ul>
                {tasksComponentsList}
            </ul>
            <ControlButtons
                changeFilter={props.changeFilter}
                filter = {props.filter}
            />
        </>
    );

};

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