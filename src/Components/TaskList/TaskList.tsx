import React from 'react';
import Task from "../Task/Task";
import {TaskType} from "../TodoList/TodoList";
import ControlButtons from "../ControlButtons/ControlButtons";
import {FilterValueType} from "../../App";

type TaskListPropsType = {
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValueType) => void
}

const TaskList = (props: TaskListPropsType) => {
    // const tasksComponentsList = props.tasks.map(task => <Task
    //     isDone={task.isDone}
    //     title={task.title}
    //     id={task.id}
    // />)

    const tasksComponentsList = props.tasks.map(task => <Task key={task.id} {...task} removeTask={props.removeTask}/>)

    return (
        <>
            <ul>
                {tasksComponentsList}
            </ul>
            <ControlButtons FilteredTasks={props.FilteredTasks}/>
        </>
    );

};

export default TaskList;