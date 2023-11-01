import { FilterType } from "./App"


type TaskType = {
  id: number
  title: string
  isDone: boolean
}

type propsType = {
  title: string
  tasks: Array<TaskType>
  removeTask: (id:number) => void
  filterTask: (value: FilterType) => void
}

export const Todolist = (props: propsType) => {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input />
        <button>+</button>
      </div>
      <ul>
        {props.tasks.map((task) => {
          return (
            <li key={task.id}>
              <input type="checkbox" checked={task.isDone} />
              <span>{task.title}</span>
              <button onClick={ () => {props.removeTask(task.id)}}>X</button>
            </li>
          )
        })}

      </ul>
      <div>
        <button onClick={ () => {props.filterTask("All")}}>All</button>
        <button onClick={ () => {props.filterTask("Active")}}>Active</button>
        <button onClick={ () => {props.filterTask("Completed")}}>Completed</button>
      </div>
    </div>
  )
}