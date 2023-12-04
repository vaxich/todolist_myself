import { ChangeEvent, useState, KeyboardEvent } from "react"
import { FilterType, TaskType } from "./App"
import './App.css';
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";



type propsType = {
  title: string
  tasks: Array<TaskType>
  filter: FilterType
  todolistId: string
  removeTask: (todolistId: string, id: string) => void
  filterTask: (todolistId: string, value: FilterType) => void
  addTask: (todolistId: string, title: string) => void
  changeTaskStatus: (todolistId: string, taskId: string) => void
  removeTodolist: (todolistId: string) => void
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todolistId: string, title: string) => void
}

export const Todolist = (props: propsType) => {

  // let [title, setTitle] = useState("")
  // let [error, seterror] = useState<string | null>(null)



  const addTask = (title:string) => {
    props.addTask(props.todolistId, title)
    

  }

  // const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.currentTarget.value)
  // }

  // const onPresshandler = (event: KeyboardEvent<HTMLInputElement>) => {
  //   seterror(null)
  //   if (event.key === "Enter") {
  //     addTask()
  //   }
  // }
  const onAllClickHandler = () => {
    props.filterTask(props.todolistId, "All")
  }
  const onActiveClickHandler = () => {
    props.filterTask(props.todolistId, "Active")
  }
  const onCompleetedClickHandler = () => {
    props.filterTask(props.todolistId, "Completed")
  }
  const changeTaskStatus = (taskId: string) => {
    props.changeTaskStatus(props.todolistId, taskId)
  }
  const removeTodolist = () => {
    props.removeTodolist(props.todolistId)
  }
  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.todolistId, title)
  }
  // const changeTaskTitle = ( title: string) => {
  //   props.changeTaskTitle(props.todolistId,  title )
  // }

  return (
    <div>
      <h3> <EditableSpan value={props.title} callBack={changeTodolistTitle}/> <button onClick={removeTodolist}>X</button></h3>
      
      <div>
        <AddItemForm callBack={addTask}/>
      
      </div>
      <ul>
        {props.tasks.map((task) => {

          const changeTaskTitle = ( title: string) => {
            props.changeTaskTitle(props.todolistId, task.id, title )
          }

          return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
              <input type="checkbox" checked={task.isDone} onChange={() => changeTaskStatus(task.id)} />
              {/* <span>{task.title}---</span> */}
              <EditableSpan value={task.title} callBack={changeTaskTitle}/>
              <button onClick={() => { props.removeTask(props.todolistId, task.id) }}>X</button>
            </li>
          )
        })}

      </ul>
      <div>
        <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
        <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
        <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompleetedClickHandler}>Completed</button>
      </div>
    </div>
  )
}