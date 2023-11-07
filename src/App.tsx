import React, { useState } from 'react';

import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type FilterType = "All" | "Active" | "Completed"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "redux", isDone: false },
    { id: v1(), title: "ajax", isDone: false }
  ]
  )

  let [filter, setFilter] = useState<FilterType>("All");



  // удаление таски
  const removeTask = (id: string) => {
    let newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
  }

  //добаввление таски
  const addTask = (title: string) => {
    let newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    let newTaks = [newTask, ...taskForTodolist];
    setTasks(newTaks)
  }

  // фильтр тасок
  const filterTask = (value: FilterType) => {
    setFilter(value)
  }

  let taskForTodolist = tasks;

  if (filter === "Active") {
    taskForTodolist = tasks.filter(task => task.isDone === false)

  }
  if (filter === "Completed") {
    taskForTodolist = tasks.filter(task => task.isDone === true)

  }





  return (
    <div className="App">
      <Todolist
        title={"what to lern"}
        tasks={taskForTodolist}
        removeTask={removeTask}
        filterTask={filterTask}
        addTask = {addTask}
      />



    </div>
  );
}




export default App;
