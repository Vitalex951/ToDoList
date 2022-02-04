import React from 'react';
import Task from "../Task/Task";
import {TaskType} from "../TodoList/TodoList";
import ControlButtons from "../ControlButtons/ControlButtons";

type TaskListPropsType = {
    tasks: Array<TaskType>
}

const TaskList = (props: TaskListPropsType) => {
    return (
        <>
            <ul>
                <Task {...props.tasks[0]}/>

                <Task {...props.tasks[1]}/>


                <Task id={} title={} isDone={} />

                <Task
                    id={props.tasks[2].id}
                    title={props.tasks[2].title}
                    isDone={props.tasks[2].isDone}/>

            </ul>
            <ControlButtons/>
        </>
    );
};

export default TaskList;