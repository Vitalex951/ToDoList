import React, {useCallback, useMemo} from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import {FilterValuesType} from "../../App";
import {ControlButtons} from "../ControlButtons/ControlButtons";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/state";
import {changeFilterAC, removeTodoListAC, updateToDoListAC} from "../reducer/todolistReducer";
import {TaskListWithRedux} from "../TaskList/TaskListWithRedux";
import {AddTaskFormWithRedux} from "../AddTaskForm/AddTaskFormWithReducer";
import {addTaskAC} from "../reducer/taskReducer";

type TodoListPropsType = {
    todoListID: string
    todolistFilter: FilterValuesType
    todolistTitle: string
}


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodoListWithRedux = React.memo((props: TodoListPropsType) => {
    console.log('TodoListWithRedux')
    let task = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])

    const dispatch = useDispatch()

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.todoListID, title))
    }, [props.todoListID])
    const updateToDoList = useCallback((title: string) => {
        return dispatch(updateToDoListAC(props.todoListID, title))
    }, [props.todoListID])
    const removeToDoList = useCallback(() => {
        dispatch(removeTodoListAC(props.todoListID))
    }, [props.todoListID])
    const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filter))
    }, [])


    let newTask = [...task]
    if (props.todolistFilter === 'active') {
        newTask = task.filter(el => !el.isDone)
    }
    if (props.todolistFilter === 'completed') {
        newTask = task.filter(el => el.isDone)
    }
    return (
        <div className='container'>
            <div className='header_div'>
                <div className='button_deleted_toDolist'>
                    <IconButton onClick={removeToDoList} size={"small"}>
                        <Delete/>
                    </IconButton>
                    {/*<ButtonMy*/}
                    {/*    name={'x'}*/}
                    {/*    callback={() => props.removeToDoList(props.todoListID)}*/}
                    {/*    classname={'removeToDoList'}/>*/}
                </div>
                <ToDoListHeader
                    title={props.todolistTitle}
                    updateToDoList={updateToDoList}/>
            </div>
            <div className='add_task'>
                <AddTaskFormWithRedux callback={addTask}/>
            </div>
            <div className='main'>
                <TaskListWithRedux
                    tasks={newTask}
                    todoListID={props.todoListID}

                />
            </div>
            <div>
                <ControlButtons
                    changeFilter={changeFilter}
                    filter={props.todolistFilter}
                    todoListID={props.todoListID}/>
            </div>
        </div>
    );
});