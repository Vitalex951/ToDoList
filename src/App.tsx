import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList/TodoList"
import {v1} from "uuid";

type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TaskObjetType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TaskObjetType>({
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
    });

    function removeToDoList(todoListID: string) {
        setTodolists(todolists.filter(el => el.id !== todoListID))
        delete tasks[todoListID]
        console.log(todolists)
    }

    function removeTask(todoListID: string, id: string) {
        setTasks({...tasks, [todoListID]: tasks[todoListID].filter(el => el.id !== id)})
        // let filterTasks = tasks.filter(t => t.id != id)
        // setTask(filterTasks)

    }

    // function changeStatus(taskId: string, isDone: boolean) {
    //     let task = tasks.find(t => t.id === taskId)
    //     if (task) {
    //         task.isDone = isDone
    //     }
    //     setTask([...tasks])
    // }


    const changeStatus = (todoListID: string, taskID: string, isDone: boolean) => {
        console.log(todoListID, isDone, taskID)
        setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskID ? {...el, isDone} : el)})
    }

    //     setTask(tasks.map(t => t.id === taskId ? {
    //     ...t,
    //     isDone: isDone
    // } : t))

    const addTask = (todoListID: string, title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
        // const newTask: TaskType = {
        //     id: v1(), title: title, isDone: false
        // }
        // const updatedTasks = [newTask, ...tasks]
        // setTask(updatedTasks)

        //     setTask([{
        //         id: v1(),
        //         title: title,
        //         isDone: false
        //     },
        //         ...tasks])
        // }
        // setTask([{
        //     id: v1(),
        //     title,   //сокращенная запись
        //     isDone: false
        // },
        //     ...tasks])
    }

//filter


    function changeFilter(todoListID: string, filter: FilterValuesType) {
        console.log(todoListID, filter)
        setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter} : el))
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForToDoList = tasks[el.id]
                if (el.filter === 'completed') {
                    tasksForToDoList = tasks[el.id].filter(f => f.isDone)
                }
                if (el.filter === 'active') {
                    tasksForToDoList = tasks[el.id].filter(f => !f.isDone)
                }

                return (
                    <div className="todolist">
                        <TodoList
                            removeToDoList={removeToDoList}
                            title={'What to learn'}
                            tasks={tasksForToDoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={el.filter}
                            todoListID={el.id}/>
                    </div>)
            })}

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