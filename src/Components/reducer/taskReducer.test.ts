import {v1} from "uuid";
import {TaskObjetType} from "../../App";
import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTitleTaskAC} from "./taskReducer";

test('should be REMOVE-TODOLIST', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let taskid = v1()
    let tasksState = {
        [todolistID1]: [
            {id: taskid, title: "HTML&CSS", isDone: true},
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
    }

    const endState = tasksReducer(tasksState, removeTaskAC(todolistID1, taskid))

    expect(endState[todolistID1].length).toBe(4);
    expect(endState[todolistID2].length).toBe(5);
});
test('should be CHANGE-STATUS', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let taskid = v1()

    let tasksState: TaskObjetType = {
        [todolistID1]: [
            {id: taskid, title: "HTML&CSS", isDone: true},
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
    }

    const endState = tasksReducer(tasksState, changeStatusAC(todolistID1, taskid, false))

    expect(endState[todolistID1][0].isDone).toBe(false);
    expect(endState[todolistID1][1].isDone).toBe(true);
    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID2].length).toBe(5);
});
test('should be addTask', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let taskid = v1()

    let tasksState: TaskObjetType = {
        [todolistID1]: [
            {id: taskid, title: "HTML&CSS", isDone: true},
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
    }

    const endState = tasksReducer(tasksState, addTaskAC(todolistID1, 'React_2.0'))

    expect(endState[todolistID1][0].title).toBe('React_2.0');
    expect(endState[todolistID1].length).toBe(6);
    expect(endState[todolistID2].length).toBe(5);
});
test('should be addEmptyTask', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let taskid = v1()

    let tasksState: TaskObjetType = {
        [todolistID1]: [
            {id: taskid, title: "HTML&CSS", isDone: true},
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
    }

    const endState = tasksReducer(tasksState, updateTitleTaskAC(todolistID1, taskid, 'MUI'))

    expect(endState[todolistID1][0].title).toBe('MUI');
    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID2].length).toBe(5);
});
test('should be UPDATE-TITLE', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    let taskid = v1()

    let tasksState: TaskObjetType = {
        [todolistID1]: [
            {id: taskid, title: "HTML&CSS", isDone: true},
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
    }

    const endState = tasksReducer(tasksState, updateTitleTaskAC(todolistID1, taskid, 'MUI'))

    expect(endState[todolistID1][0].title).toBe('MUI');
    expect(endState[todolistID1].length).toBe(5);
    expect(endState[todolistID2].length).toBe(5);
});
