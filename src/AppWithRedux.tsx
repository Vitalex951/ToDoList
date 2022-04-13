import React, {useCallback} from 'react';
import './App.css';
import {AddTaskForm} from "./Components/AddTaskForm/AddTaskForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodoListAC} from "./Components/reducer/todolistReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./Components/state/state";
import {TodoListWithRedux} from "./Components/TodoList/TodoListWithRedux";


export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
// export type TaskObjetType = {
//     [key: string]: Array<TaskType>
// }
export type FilterValuesType = 'all' | 'active' | 'completed'

export const AppWithRedux = React.memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)

    const dispatch = useDispatch()
    const addTodoList = useCallback( (title: string) => {
        dispatch(addTodoListAC(title))
    }, [])

    return (
        <div className='App'>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            News
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddTaskForm callback={addTodoList}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(el => {

                        return (
                            <Grid item key={el.id}>
                                <Paper elevation={8} style={{padding: "10px"}}>
                                    <div className="todolist">
                                        <TodoListWithRedux
                                            todoListID={el.id}
                                            todolistTitle={el.title}
                                            todolistFilter={el.filter}
                                        />
                                    </div>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
});
