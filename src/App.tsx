import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}
export type FilterType = "All" | "Active" | "Completed"

function App() {

  let [tasks, setTasks] = useState<Array<TaskType>>([
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false },
    { id: 4, title: "redux", isDone: false },
    { id: 5, title: "ajax", isDone: false }
  ]
  )

  let [filter, setFilter] = useState<FilterType>("All");

  

  // удаление таски
  const removeTask = (id: number) => {
    let newTasks = tasks.filter(task => task.id !== id)
    setTasks(newTasks)
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

      />



    </div>
  );
}




export default App;
