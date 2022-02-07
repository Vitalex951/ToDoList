import React from 'react';
import Task from "../Task/Task";
import {TaskType} from "../TodoList/TodoList";
import ControlButtons from "../ControlButtons/ControlButtons";
<<<<<<< HEAD
import {FilterValueType} from "../../App";
=======
>>>>>>> origin/main

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
<<<<<<< HEAD
                {tasksComponentsList}
            </ul>
            <ControlButtons FilteredTasks={props.FilteredTasks}/>
=======
                <Task {...props.tasks[0]}/>

                <Task {...props.tasks[1]}/>


                <Task id={} title={} isDone={} />

                <Task
                    id={props.tasks[2].id}
                    title={props.tasks[2].title}
                    isDone={props.tasks[2].isDone}/>

                    <>;
            </ul>
            <ControlButtons/>
>>>>>>> origin/main
        </>
    );

};

export default TaskList;