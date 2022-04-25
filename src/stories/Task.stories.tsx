import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TaskWithRedux} from "../Components/Task/TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Components/state/state";
import {TaskType} from "../Components/TodoList/TodoListWithRedux";


export default {
    title: 'Todolist/Task',
    component: TaskWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof TaskWithRedux>;

//
// const changeTaskStautsCallback =
// const changeTaskTitleCallback = )
// const removeTaskStautsCallback = a
//
// export const TaskBaseExample = () => {
//     return <>
//         <Task
//             id={'1'}
//             title={'task1'}
//             isDone={false}
//             removeTask={removeTaskStautsCallback}
//             changeStatus={changeTaskStautsCallback}
//             todoListID={'todolist1'}
//             updateTitleTask={removeTaskStautsCallback}/>
//     </>
// }

const Template: ComponentStory<typeof TaskUsingRedux> = () => <TaskUsingRedux/>;


const TaskUsingRedux = () => {
    const task1 = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId1"][0])
    const task2 = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistId2"][0])
    return (<>
            <TaskWithRedux id={task1.id} title={task1.title} isDone={task1.isDone} todoListID={'todolistId1'}/>
            <TaskWithRedux id={task2.id} title={task2.title} isDone={task2.isDone} todoListID={'todolistId2'}/>
        </>
    )
}

export const TaskISDoneExample = Template.bind({});

// TaskISDoneExample.args = {
//     id: '1',
//     title: 'JS',
//     isDone: true,
//     todoListID: 'todolistId1',
//
// }

// removeTask: action('remove changed'),
// changeStatus: action('Status changed'),
// updateTitleTask: action('Update title changed')
// export const TaskISNoteDoneExample = Template.bind({});
// TaskISNoteDoneExample.args = {
//   id: '1',
//   title: 'JS',
//   isDone: false,
//   todoListID: 'todoListID1'
//
//
// }