import React, { useState } from 'react';

import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TaskStateType = {
  [key: string]: TaskType[]
}
export type TodolistsType = {
  id: string,
  title: string
  filter: FilterType
}
export type FilterType = "All" | "Active" | "Completed"

function App() {

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    { id: todolistID1, title: 'What to learn', filter: 'All' },
    { id: todolistID2, title: 'What to buy', filter: 'All' },
  ])

  let [tasks, setTasks] = useState<TaskStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },

    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ]
  })

  // удаление тудулиста
  const removeTodolist = (todolistId: string) => {
    let todolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(todolist);
    delete tasks[todolistId]
    setTasks(tasks)
  }

  // удаление таски
  const removeTask = (todolistId: string, taskId: string) => {
    let todolistTasks = tasks[todolistId] // таски одного тудулиста
    tasks[todolistId] = todolistTasks.filter(t => t.id !== taskId)// фильтруем и перезаписываем
    setTasks({ ...tasks })// обновляем стейт
  }

  //добаввление таски
  const addTask = (todolistId: string, title: string) => {
    let newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    let todolistTasks = tasks[todolistId] // таски одного тудулиста
    tasks[todolistId] = [newTask, ...todolistTasks] //бодавляем таск и обновляем
    setTasks({ ...tasks })// обновляем стейт
  }

  // фильтр тасок
  const filterTask = (todolistId: string, value: FilterType) => {
    let todolist = todolists.map(tl => tl.id === todolistId ? { ...tl, filter: value } : tl)//мапим, и при совпадении меняем значение
    setTodolists(todolist) // обновляем стейт
  }
  // смена статуса таски
  const changeTaskStatus = (todolistId: string, taskId: string) => {
    let todolistTasks = tasks[todolistId] // таски одного тудулиста
    let filteredTasks = todolistTasks.map(t => t.id === taskId ? { ...t, isDone: !t.isDone } : t) // меняем статус нужной таскм
    tasks[todolistId] = filteredTasks // перезаписываем
    setTasks({ ...tasks })// обновляем стейт
  }
  const addTodolist = (title: string) => {
    let newTodolistId = v1() //новая ИД для тудулиста
    let newTodolist: TodolistsType = { // новый тудулист
      id: newTodolistId,
      title: title,
      filter: 'All'
    }

    setTodolists([newTodolist, ...todolists]); //обновляем тудулисты и добавляем новый

    setTasks({ ...tasks, [newTodolist.id]: [] })// обновляем стейт с тасками
  }
  const changeTaskTitle = (todolistId: string, taskId: string, title: string) => {
    let todolistTasks = tasks[todolistId] // таски одного тудулиста
    let filteredTasks = todolistTasks.map(t => t.id === taskId ? { ...t, title: title } : t) // меняем титл нужной таскм
    tasks[todolistId] = filteredTasks // перезаписываем
    setTasks({ ...tasks })// обновляем стейт
  }
  const changeTodolistTitle = (todolistId: string, title: string) => {
    todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl)
    setTodolists(todolists)
  }


  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"

          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container fixed>
        <Grid container style={{ padding: "10px" }}>
          <AddItemForm callBack={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map(tl => {
            let taskForTodolist = tasks[tl.id];


            if (tl.filter === "Active") {
              taskForTodolist = tasks[tl.id].filter(task => task.isDone === false)

            }
            if (tl.filter === "Completed") {
              taskForTodolist = tasks[tl.id].filter(task => task.isDone === true)

            }
            return <Grid item>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  tasks={taskForTodolist}
                  filter={tl.filter}
                  removeTask={removeTask}
                  filterTask={filterTask}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          })}
        </Grid>

      </Container>

    </div>
  );
}




export default App;
