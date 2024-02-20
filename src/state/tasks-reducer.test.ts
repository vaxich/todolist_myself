
import { TaskStateType } from '../App'
import { v1 } from 'uuid';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer } from './tasks-reducer';
import { addTodolistAC, removeTodolistAC } from './todolists-reducer';

test('корректная таска должна быть удалена из нужного массива', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }



    const endState: TaskStateType = taskReducer(startState, removeTaskAC(todolistID2, startState[todolistID2][1].id))

    expect(endState[todolistID2].length).toBe(1);
    expect(endState[todolistID1].length).toBe(3);


})

test('корректная таска должна добавлена в нужный массив', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = taskReducer(startState, addTaskAC(todolistID2, 'juce'))

    expect(endState[todolistID2][0].title).toBe('juce')
    expect(endState[todolistID2].length).toBe(3)
    expect(endState[todolistID2][0].id).toBeDefined()
    expect(endState[todolistID2][0].isDone).toBe(false)
})

test('статус таски в нужном массиве должен быть изменён', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = taskReducer(startState, changeTaskStatusAC(todolistID2, startState[todolistID2][1].id))

    expect(endState[todolistID2][1].isDone).toBe(true)

})

test('титле таски в нужном массиве должен быть изменён', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const endState = taskReducer(startState, changeTaskTitleAC(todolistID2, startState[todolistID2][1].id, 'Pavel'))

    expect(endState[todolistID2][1].title).toBe('Pavel')

})

test('добавление тудулиста', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    const action = addTodolistAC('new todolist')

    const endState = taskReducer(startState, action)


    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)

})

test('все таски из тудулиста должны быть удалены', () => {
    const todolistID1 = v1();
    const todolistID2 = v1();

    const startState: TaskStateType = {
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },

        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ]
    }

    //const action = RemoveTodolistAC('todolistId2')

    const endState = taskReducer(startState, removeTodolistAC('todolistId2')
    )


    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})




