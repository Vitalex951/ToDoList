import React, {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import {addTodoListTS, fetchTodosTS, TodolistDomainType} from "../reducer/todolistReducer";
import {Grid, Paper} from "@material-ui/core";
import {TodoListWithRedux} from "./TodoListWithRedux";
import {AddTaskForm} from "../trash/AddTaskForm";
import {Navigate} from "react-router-dom";


export const ToDoListContainer = () => {
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(fetchTodosTS())
        }
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTS(title))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <>
            <Grid container style={{padding: "20px"}}>
                <AddTaskForm callback={addTodoList}/>
            </Grid>
            {todolists.map(el => {
                return (
                    <Grid item key={el.id}>
                        <Paper elevation={8} style={{padding: "10px"}}>
                            <div className="todolist">
                                <TodoListWithRedux
                                    entityStatus={el.entityStatus}
                                    todoListID={el.id}
                                    todolistTitle={el.title}
                                    todolistFilter={el.filter}
                                />
                            </div>
                        </Paper>
                    </Grid>
                )
            })
            }
        </>
    );
};
