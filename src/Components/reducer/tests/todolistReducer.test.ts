import {
    addTodoListAC,
    changeFilterAC,
    changeTodoListEnityStatusAC,
    removeTodoListAC,
    TodolistDomainType, todolistReducer, updateToDoListAC
} from "../todolistReducer";

let startState: TodolistDomainType[] = []
beforeEach(() => {
    startState = [
        {id: "todolistID1", title: 'What to learn', addedDate: '', order: 3, filter: 'all', entityStatus: "succeeded"},
        {id: "todolistID2", title: 'What to buy', addedDate: '', order: 3, filter: 'all', entityStatus: "succeeded"},
    ]

})
test('correct todolist should be REMOVE-TODOLIST', () => {

    const endState = todolistReducer(startState, removeTodoListAC({todoListID: "todolistID1"}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe("todolistID2")
})
test('correct todolist should be  CHANGE-FILTER', () => {
    const endState = todolistReducer(startState, changeFilterAC({todoListID: "todolistID1", filter: 'active'}))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
});
test('correct todolist should be  ADD-TODOLIST', () => {

    let todoList = {id: "todolistID3", title: 'What to remove', addedDate: '', order: 3, filter: 'all'}
    const endState = todolistReducer(startState, addTodoListAC({todoList}))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe('What to remove')
});
test('correct todolist should be UPDATE-TODOLIST', () => {
    const newTitle = 'What to remove'
    const endState = todolistReducer(startState, updateToDoListAC({todoListID: "todolistID1", title: newTitle}))

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe('What to remove')
});

test('change status in todolist', () => {
    const endState = todolistReducer(startState, changeTodoListEnityStatusAC({
        status: "loading",
        todoListID: "todolistID2"
    }))

    expect(endState.length).toBe(2)
    expect(endState[1].entityStatus).toBe('loading')
    expect(endState[0].entityStatus).toBe('succeeded')
});