import {v1} from "uuid";
import {TodolistsType} from "../../App";
import {addTodoListAC, changeFilterAC, removeTodoListAC, todoListReducer, updateToDoListAC} from "./todolistReducer";

test('correct todolist should be REMOVE-TODOLIST', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, removeTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2)
})
test('correct todolist should be  CHANGE-FILTER', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, changeFilterAC(todolistId1, "active"))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
});
test('correct todolist should be  ADD-TODOLIST', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const newTitle = 'What to remove'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, addTodoListAC(todolistId1, newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe('What to remove')
});
test('correct todolist should be UPDATE-TODOLIST', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();
    const newTitle = 'What to remove'

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todoListReducer(startState, updateToDoListAC(todolistId1, newTitle))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to remove')
});
