import React, {useReducer} from 'react';
import './App.css';

import {AppBar, Box, Grid, IconButton, Toolbar, Typography} from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import {Menu} from "@material-ui/icons";
import {addTaskAC, removeTaskAC, tasksReducer, updateTaskAC} from "../Components/reducer/taskReducer";
import {
    addTodoListAC,
    changeFilterAC,
    removeTodoListAC, todolistReducer,
    updateToDoListAC
} from "../Components/reducer/todolistReducer";
import {AddTaskForm} from "../Components/trash/AddTaskForm";
import {TaskPriorities, TaskStatuses} from "../api/todos-api";
import TodoList from "../Components/trash/TodoList";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [todolists, todolistsDispatch] = useReducer(todolistReducer, [
        {id: "todolistID1", title: 'What to learn', addedDate: '', order: 3, filter: 'all', entityStatus: "succeeded"},
        {id: "todolistID2", title: 'What to buy', addedDate: '', order: 3, filter: 'all', entityStatus: "succeeded"},
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        ["todolistID1"]: [
            {
                id: '1',
                title: "HTML&CSS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '2',
                title: "JS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '3',
                title: "ReactJS",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '4',
                title: "Rest API",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '5',
                title: "GraphQL",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
        ],
        ["todolistID2"]: [
            {
                id: '1',
                title: "HTML&CSS2",
                status: TaskStatuses.Completed,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '2',
                title: "JS2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '3',
                title: "ReactJS2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '4',
                title: "Rest API2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
            {
                id: '5',
                title: "GraphQL2",
                status: TaskStatuses.New,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
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


    //TodoList
    function removeToDoList(todoListID: string) {
        todolistsDispatch(removeTodoListAC({todoListID}))
        tasksDispatch(removeTodoListAC({todoListID}))
    }

    const updateToDoList = (todoListID: string, title: string) => {
        todolistsDispatch(updateToDoListAC({todoListID, title}))
    }
    const addTodoList = (title: string) => {
        let newTodolist = addTodoListAC({
            todoList: {id: "todolistID1", title, addedDate: '', order: 3}
        })
        todolistsDispatch(newTodolist)
        tasksDispatch(newTodolist)
    }

    function changeFilter(todoListID: string, filter: FilterValuesType) {
        todolistsDispatch(changeFilterAC({todoListID, filter}))
    }


    //tasks
    const changeStatus = (todoListID: string, taskID: string, status: TaskStatuses) => {
        tasksDispatch(updateTaskAC({
            task: {
                id: '1',
                title: "HTML&CSS",
                status,
                todoListId: 'todoListId1',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            }
        }))
    }
    const addTask = (todoListID: string, title: string) => {
        tasksDispatch(addTaskAC({
            newTask: {
                id: '1',
                title,
                status: TaskStatuses.New,
                todoListId: todoListID,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            }
        }))
    }

    const updateTitleTask = (todolistID: string, taskID: string, title: string) => {
        tasksDispatch(updateTaskAC({
            task: {
                id: taskID,
                title,
                status: TaskStatuses.New,
                todoListId: todolistID,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            }
        }))
    }

    function removeTask(todoListID: string, id: string) {
        tasksDispatch(removeTaskAC({todoListID, id}))
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
                            tasksForToDoList = tasks[el.id].filter(f => f.status === TaskStatuses.Completed)
                        }
                        if (el.filter === 'active') {
                            tasksForToDoList = tasks[el.id].filter(f => f.status === TaskStatuses.New)
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