import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList/TodoList"
import {v1} from "uuid";
import AddTaskForm from "./Components/AddTaskForm/AddTaskForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC,
    todoListReducer,
    updateToDoListAC
} from "./Components/reducer/todolistReducer";
import {
    addEmptyTaskAC,
    addTaskAC,
    changeStatusAC,
    removeTaskAC,
    tasksReducer,
    updateTitleTaskAC
} from "./Components/reducer/taskReducer";


export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskObjetType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todoListReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    })

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: todolistID1, title: 'What to learn', filter: 'all'},
    //     {id: todolistID2, title: 'What to buy', filter: 'all'},
    // ])

    // let [tasks, setTasks] = useState<TaskObjetType>({
    //     [todolistID1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true},
    //         {id: v1(), title: "ReactJS", isDone: false},
    //         {id: v1(), title: "Rest API", isDone: false},
    //         {id: v1(), title: "GraphQL", isDone: false},
    //     ],
    //     [todolistID2]: [
    //         {id: v1(), title: "HTML&CSS2", isDone: true},
    //         {id: v1(), title: "JS2", isDone: true},
    //         {id: v1(), title: "ReactJS2", isDone: false},
    //         {id: v1(), title: "Rest API2", isDone: false},
    //         {id: v1(), title: "GraphQL2", isDone: false},
    //     ]
    // });

    function removeToDoList(todoListID: string) {
        todolistsDispatch(removeTodoListAC(todoListID))
        delete tasks[todoListID]
    }

    function removeTask(todoListID: string, id: string) {
        tasksDispatch(removeTaskAC(todoListID, id))
    }

    function changeFilter(todoListID: string, filter: FilterValuesType) {
        todolistsDispatch(changeFilterAC(todoListID, filter))
    }

    const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        tasksDispatch(changeStatusAC(todoListID, taskID, isDone))
    }
    const addTask = (todoListID: string, title: string) => {
        tasksDispatch(addTaskAC(todoListID, title))
    }
    const addTodoList = (title: string) => {
        let newId = v1()
        todolistsDispatch(addTodoListAC(newId, title))
        tasksDispatch(addEmptyTaskAC(newId))
    }
    const updateToDoList = (todoListID: string, title: string) => {
        todolistsDispatch(updateToDoListAC(todoListID, title))
    }
    const updateTitleTask = (todolistID: string, taskID: string, title: string) => {
        tasksDispatch(updateTitleTaskAC(todolistID, taskID, title))
    }

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
                    {/*<div className='addTodolist'>*/}
                    <AddTaskForm callback={addTodoList}/>
                    {/*</div>*/}
                </Grid>
                <Grid container spacing={3}>
                    {/*<div className="main_container">*/}
                    {todolists.map(el => {
                        let tasksForToDoList = tasks[el.id]
                        if (el.filter === 'completed') {
                            tasksForToDoList = tasks[el.id].filter(f => f.isDone)
                        }
                        if (el.filter === 'active') {
                            tasksForToDoList = tasks[el.id].filter(f => !f.isDone)
                        }

                        return (
                            <Grid item>
                                <Paper elevation={8} style={{padding: "10px"}}>
                                    <div className="todolist">

                                        <TodoList
                                            removeToDoList={removeToDoList}
                                            title={el.title}
                                            tasks={tasksForToDoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            filter={el.filter}
                                            todoListID={el.id}
                                            updateTitleTask={updateTitleTask}
                                            updateToDoList={updateToDoList}/>
                                    </div>
                                </Paper>
                            </Grid>)
                    })}
                    {/*</div>*/}
                </Grid>
            </Container>
        </div>
    );
}

export default App;


// const [tasks, setTasks] = useState<Array<TaskType>>([
//     {id: 1, title: 'HTML', isDone: true},
//     {id: 2, title: 'CSS', isDone: true},
//     {id: 3, title: 'JS/TS', isDone: false}
// ])
//
// const [filter, setFilter] = useState<FilterValueType>('all')
//
//     {id: 3, title: 'JS/TS', isDone: true},
// ]
//
//
// const removeTask = (taskID: number) => {
//     const filteredTasks = tasks.filter(task => task.id !== taskID)
//     setTasks(filteredTasks)
// }
//
// const changeFilter = (filter: FilterValueType) => {
//     setFilter(filter)
// }
// const getFilteredTasksForRender = () => {
//     switch (filter) {
//         case "completed":
//             return tasks.filter(task => task.isDone)
//         case "active":
//             return tasks.filter(task => !task.isDone)
//         default:
//             return tasks
//
//     }
// }
// const filteredTasksForRender = getFilteredTasksForRender()