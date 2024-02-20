import { v1 } from "uuid"
import { FilterType, TodolistsType } from "../App"

export const todolistsReducer = (state: TodolistsType[], action: TodolistsReducerActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistsType = { // новый тудулист
                id: action.payload.newTodolistId,
                title: action.payload.newTodolistTitle,
                filter: 'All'
            }
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE":{
           return  state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.newTitle } : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.value } : tl)
        }
        default: { return state }
    }
}

type TodolistsReducerActionsType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export type addTodolistACType = ReturnType<typeof addTodolistAC>
type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: { todolistId }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    let newTodolistId = v1();
    return {
        type: "ADD-TODOLIST",
        payload: { newTodolistId, newTodolistTitle }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTitle: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: { todolistId , newTitle}
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, value: FilterType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: { todolistId , value}
    } as const
}