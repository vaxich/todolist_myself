import { ChangeEvent, ChangeEventHandler, useState, KeyboardEvent } from "react"
import { FilterType, TaskType } from "./App"




type propsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id: string) => void
  filterTask: (value: FilterType) => void
  addTask: (title: string) => void
}

export const Todolist = (props: propsType) => {

  let [title, setTitle] = useState("")

  const addTask = () => {
    props.addTask(title);
    setTitle("");
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onPresshandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTask()
    }
  }
  const onAllClickHandler = () => {
    props.filterTask("All")
  }
  const onActiveClickHandler = () => {
    props.filterTask("Active")
  }
  const onCompleetedClickHandler = () => {
    props.filterTask("Completed")
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          onKeyPress={onPresshandler}
          onChange={onChangeHandler}
          value={title} />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={() => { props.removeTask(task.id) }}>X</button>
            </li>
          )
        })}

      </ul>
      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompleetedClickHandler}>Completed</button>
      </div>
    </div>
  )
}