import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Components/TodoList/TodoList"

//18-39
//18-30
//19-25
//19-33 разобраться
//19-57 яяя
//20-51 xuk
//21-00 xuk_2

export type FilterValuesType = 'all' | 'active' | 'completed' 

function App() {


    //deleted Tasks
    let [tasks, setTask] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'JS/TS', isDone: false},
    ]);

    function removeTask(id: number) {
        let filterTasks = tasks.filter(t => t.id != id)
        setTask(filterTasks)
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


    console.log(tasks)
    console.log(tasksForToDoList)
    
    return (
        <>
            <div className="App">
                <TodoList
                    title={'What to learn'}
                    tasks={tasksForToDoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}

                />
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