import { v1 } from "uuid"
import { TaskStateType, TaskType } from "../App"
import { addTodolistACType, removeTodolistACType } from "./todolists-reducer"


export const taskReducer = (state: TaskStateType, action: TasksReducerActionsType): TaskStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            let copyState = { ...state }
            let todolistTasks = copyState[action.payload.todolistId] // таски одного тудулиста
            copyState[action.payload.todolistId] = todolistTasks.filter(t => t.id !== action.payload.taskId)// фильтруем и перезаписываем
            // setTasks({ ...tasks })// обновляем стейт
            return { ...copyState }
            //return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TASK": {
            let newTask: TaskType = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            let copyState = { ...state }
            let todolistTasks = copyState[action.payload.todolistId] // таски одного тудулиста
            copyState[action.payload.todolistId] = [newTask, ...todolistTasks] //бодавляем таск и обновляем
            return { ...copyState }

        }
        case "CHANGE-TASK-STATUS": {
            let copyState = { ...state }
            let todolistTasks = copyState[action.payload.todolistId] // таски одного тудулиста
            let filteredTasks = todolistTasks.map(t => t.id === action.payload.taskId ? { ...t, isDone: !t.isDone } : t) // меняем статус нужной таскм
            copyState[action.payload.todolistId] = filteredTasks // перезаписываем
            return { ...copyState }
        }
        case "CHANGE-TASK-TITLE": {
            let copyState = { ...state }
            let todolistTasks = copyState[action.payload.todolistId] // таски одного тудулиста
            let filteredTasks = todolistTasks.map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t) // меняем статус нужной таскм
            copyState[action.payload.todolistId] = filteredTasks // перезаписываем
            return { ...copyState }
        }
        case "ADD-TODOLIST": {
            let copyState = { ...state, [action.payload.newTodolistId]: [] }
            //copyState[action.payload.newTodolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST":{
            let copyState = { ...state }
            delete copyState[action.payload.todolistId]
            return copyState
        }

        default: { return state }
    }
}

type TasksReducerActionsType = removeTaskACType | addTaskACType | changeTaskStatusACACType | changeTaskTitleACType | addTodolistACType | removeTodolistACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
type addTaskACType = ReturnType<typeof addTaskAC>
type changeTaskStatusACACType = ReturnType<typeof changeTaskStatusAC>
type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: { todolistId, taskId }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: { todolistId, title }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: { todolistId, taskId }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: { todolistId, taskId, title }
    } as const
}