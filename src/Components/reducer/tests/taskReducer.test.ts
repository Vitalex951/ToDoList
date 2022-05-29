import {TaskObjetType} from "../taskReducer";
import {TaskPriorities, TaskStatuses} from "../../../api/todos-api";


let startState: TaskObjetType = {}
beforeEach(() => {
    startState = {
        ["todolistID1"]: [
            {
            id: '1',
            title: "HTML&CSS",
            status: TaskStatuses.New,
            todoListId: 'todolistID1',
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
                todoListId: 'todolistID1',
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
                todoListId: 'todolistID1',
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
                todoListId: 'todolistID1',
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
                todoListId: 'todolistID1',
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
                todoListId: 'todolistID2',
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
                todoListId: 'todolistID2',
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
                todoListId: 'todolistID2',
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
                todoListId: 'todolistID2',
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
                todoListId: 'todolistID2',
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                entityStatus: "succeeded"
            },
        ]
    }
})

// test('should be REMOVE-TASK', () => {
//     const endState = tasksReducer(startState, removeTaskAC("todolistID1",'1'))
//     expect(endState["todolistID1"].length).toBe(4);
//     expect(endState["todolistID2"].length).toBe(5);
// });
// test('should be CHANGE-STATUS', () => {
//    let task = {...startState["todolistID1"][1], status: TaskStatuses.Completed}
//     const endState = tasksReducer(startState, updateTaskAC(task))
//
//     expect(endState["todolistID1"][0].status).toBe(TaskStatuses.New);
//     expect(endState["todolistID1"][1].status).toBe(TaskStatuses.Completed);
//     expect(endState["todolistID1"].length).toBe(5);
//     expect(endState["todolistID2"].length).toBe(5);
// });
// test('should be addTask', () => {
//     let task = {...startState["todolistID2"][0], title: 'React_2.0'}
//     const endState = tasksReducer(startState, addTaskAC(task))
//
//     expect(endState["todolistID2"][0].title).toBe('React_2.0');
//     expect(endState["todolistID2"].length).toBe(6);
//     expect(endState["todolistID1"].length).toBe(5);
// });
// test('should be addEmptyTask', () => {
//     let task = {...startState["todolistID2"][2], title: 'React_2.0'}
//     const endState = tasksReducer(startState, updateTaskAC(task))
//
//     expect(endState["todolistID2"][2].title).toBe('React_2.0');
//     expect(endState["todolistID2"][0].title).toBe('HTML&CSS2');
//     expect(endState["todolistID2"].length).toBe(5);
//     expect(endState["todolistID1"].length).toBe(5);
// });
