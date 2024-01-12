import { v1 } from "uuid"
import { FilterType, TodolistsType } from "../App";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "./todolists-reducer";


test("тудулист должен быть удалён", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todolistID1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistID2);
})

test("тудулист должен быть добавлен", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test("имя тудулиста должно быть изменено", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistID1, newTodolistTitle))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTodolistTitle);
})

test("фильтр тудулиста должно быть изменен", () => {
    let todolistID1 = v1();
    let todolistID2 = v1();

    let newTodolistFilter: FilterType = "Active";

    const startState: TodolistsType[] = [
        { id: todolistID1, title: 'What to learn', filter: 'All' },
        { id: todolistID2, title: 'What to buy', filter: 'All' },
    ]

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistID1, newTodolistFilter))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe(newTodolistFilter);
})

