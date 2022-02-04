import React from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import TaskList from "../TaskList/TaskList";

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}


export type TaskType = {
    id: number
    title: string
    isDone: boolean

}

const TodoList = (props: TodoListPropsType) => {

    return (
        <div>
            <ToDoListHeader title={props.title}/>
            <TaskList tasks={props.tasks}/>
        </div>
    );
};

export default TodoList;