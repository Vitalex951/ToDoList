import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Components/store/store";
import {addTodoListTS, fetchTodosTS, TodolistDomainType} from "../Components/reducer/todolistReducer";
import {TodoListWithRedux} from "../Components/TodoList/TodoListWithRedux";
import {AddTaskForm} from "../Components/trash/AddTaskForm";
import LinearProgress from "@material-ui/core/LinearProgress";
import {RequestStatusType} from "../Components/reducer/app-reducer";
import {ErrorSnackbar} from "../Components/snacbar/ErrorSnackbar";


export const AppWithRedux = React.memo(() => {
    useEffect(() => {
        dispatch(fetchTodosTS())
    }, [])
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todoLists)
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTS(title))
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
            <div className='statusContainer'>
                {status === "loading" && <LinearProgress/>}
            </div>
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
                                            entityStatus={el.entityStatus}
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
            <ErrorSnackbar/>
        </div>
    );
});
