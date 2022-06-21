import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../Components/store/store";
import LinearProgress from "@material-ui/core/LinearProgress";
import {initializeAppTC, RequestStatusType} from "../Components/reducer/app-reducer";
import {ErrorSnackbar} from "../Components/snacbar/ErrorSnackbar";
import {Login} from "../Components/Login/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {ToDoListContainer} from "../Components/TodoList/ToDoListContainer";
import CircularProgress from "@material-ui/core/CircularProgress";
import {logOutTC} from "../Components/reducer/auth-reducer";


export const AppWithRedux = React.memo(() => {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const setLogout = () => {
        dispatch(logOutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className='App'>
            {/*<Box sx={{flexGrow: 1}}>*/}
            {/*    <AppBar position="static">*/}
            {/*        <Toolbar>*/}
            {/*            <IconButton*/}
            {/*                size="large"*/}
            {/*                edge="start"*/}
            {/*                color="inherit"*/}
            {/*                aria-label="menu"*/}
            {/*                sx={{mr: 2}}*/}
            {/*            >*/}
            {/*                <Menu/>*/}
            {/*            </IconButton>*/}
            {/*            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>*/}
            {/*                News*/}
            {/*            </Typography>*/}
            {/*            {isLoggedIn && <Button color='inherit' onClick={setLogout}>LogOut</Button>}*/}
            {/*            {!isLoggedIn && <Button color="inherit">Login</Button>}*/}
            {/*        </Toolbar>*/}
            {/*    </AppBar>*/}
            {/*</Box>*/}
            <div className='statusContainer'>
                {status === "loading" && <LinearProgress/>}
            </div>
            <Container fixed>
                <Grid container spacing={3} style={{marginTop: "20px"}}>
                    <Routes>
                        <Route path={'/'} element={<ToDoListContainer/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1 style={{margin: '0 auto'}}>404 page not found</h1>}/>
                        <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </Grid>
            </Container>
            <ErrorSnackbar/>
        </div>
    );
});
