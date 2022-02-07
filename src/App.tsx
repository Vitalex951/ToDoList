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

export type FilterValueType = 'all' | 'active' | 'completed'



function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
<<<<<<< HEAD
        {id: 3, title: 'JS/TS', isDone: false}
    ])

    const [filter, setFilter] = useState<FilterValueType>('all')
=======
        {id: 3, title: 'JS/TS', isDone: true},
    ]
>>>>>>> origin/main

    const removeTask = (taskID: number) => {
        const filteredTasks = tasks.filter(task => task.id !== taskID)
        setTasks(filteredTasks)
    }

    const changeFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }
    const getFilteredTasksForRender = () => {
        switch (filter) {
            case "completed":
                return tasks.filter(task => task.isDone)
            case "active":
                return tasks.filter(task => !task.isDone)
            default:
                return tasks

        }
    }
    const filteredTasksForRender = getFilteredTasksForRender()

    return (
        <>
        <div className="App">
            <TodoList
                title={'What to learn'}
                removeTask={removeTask}
                changeFilter={changeFilter}
                tasks={filteredTasksForRender}/>

            {/*<TodoList title={'What is ready'} tasks={tasks_2}/>*/}
            {/*<TodoList title={'What is buy'} tasks={tasks_3}/>*/}
        </div>
            </>
    );
}

export default App;
