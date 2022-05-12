import React, {useCallback, useEffect} from 'react';
import ToDoListHeader from "../TodoListHeader/ToDoListHeader";
import {FilterValuesType} from "../../app/App";
import {ControlButtons} from "../ControlButtons/ControlButtons";
import {Delete} from "@material-ui/icons";
import {IconButton} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {changeFilterAC, removeTodoListTS, updateTitleTodoListTS} from "../reducer/todolistReducer";
import {TaskListWithRedux} from "../TaskList/TaskListWithRedux";
import {AddTaskFormWithRedux} from "../AddForm/AddFormWithReducer";
import {addTaskTC, fetchTasksTC} from "../reducer/taskReducer";
import {TaskStatuses, TaskType} from "../../api/todos-api";
import {RequestStatusType} from "../reducer/app-reducer";

type TodoListPropsType = {
    todoListID: string
    todolistFilter: FilterValuesType
    todolistTitle: string
    entityStatus: RequestStatusType
}

export const TodoListWithRedux = React.memo((props: TodoListPropsType) => {

    const task = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todoListID))
    }, [])


    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(props.todoListID, title))
    }, [props.todoListID])
    const updateToDoList = useCallback((title: string) => {
        dispatch(updateTitleTodoListTS(props.todoListID, title))
    }, [props.todoListID])
    const removeToDoList = useCallback(() => {
        dispatch(removeTodoListTS(props.todoListID))
    }, [props.todoListID])
    const changeFilter = useCallback((todoListID: string, filter: FilterValuesType) => {
        dispatch(changeFilterAC(todoListID, filter))
    }, [])


    let newTask = [...task]
    if (props.todolistFilter === 'active') {
        newTask = task.filter(el => el.status === TaskStatuses.New)
    }
    if (props.todolistFilter === 'completed') {
        newTask = task.filter(el => el.status === TaskStatuses.Completed)
    }

    return (
        <div className='container'>
            <div className='header_div'>
                <div className='button_deleted_toDolist'>
                    <IconButton onClick={removeToDoList} size={"small"} disabled={props.entityStatus === 'loading'}>
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
                <AddTaskFormWithRedux
                    callback={addTask}
                    disabled={props.entityStatus === "loading"}/>
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