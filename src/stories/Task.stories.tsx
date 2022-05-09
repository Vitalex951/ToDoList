import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {TaskWithRedux} from "../Components/Task/TaskWithRedux";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../Components/store/store";
import {TaskType} from "../api/todos-api";


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
    const task1 = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistID1"][0])
    const task2 = useSelector<AppRootStateType, TaskType>(state => state.tasks["todolistID2"][0])
    return (<>
            <TaskWithRedux
                todoListID={'todolistID1'}
                task={task1}
                {...task1}
            />
            <TaskWithRedux
                {...task2}
                todoListID={'todolistID2'}
                task={task2}
            />
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