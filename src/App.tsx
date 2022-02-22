import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList/TodoList"
import {v1} from "uuid";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    //deleted Tasks
    const [tasks, setTask] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'JS/TS', isDone: false},
        {id: v1(), title: 'React/js', isDone: false},
        {id: v1(), title: 'React API', isDone: false},
    ]);

    function removeTask(id: string) {
        let filterTasks = tasks.filter(t => t.id != id)
        setTask(filterTasks)
    }

    // function changeStatus(taskId: string, isDone: boolean) {
    //     let task = tasks.find(t => t.id === taskId)
    //     if (task) {
    //         task.isDone = isDone
    //     }
    //     setTask([...tasks])
    // }
    const changeStatus = (taskId: string, isDone: boolean) => setTask(tasks.map (t => t.id === taskId? {...t, isDone: isDone}: t))

    const addTask = (title: string) => {
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
        setTask([{
            id: v1(),
            title,   //сокращенная запись
            isDone: false
        },
            ...tasks])
    }

//filter

    let [filter, setFilter] = useState<FilterValuesType>('all')
    let tasksForToDoList = tasks
    if (filter === 'completed') {
        tasksForToDoList = tasks.filter(f => f.isDone)
    }
    if (filter === 'active') {
        tasksForToDoList = tasks.filter(f => !f.isDone)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }


    return (
        <>
            <div className="App">
                <TodoList
                    title={'What to learn'}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={filter}/>
            </div>
        </>
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