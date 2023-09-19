import { useContext } from "react"
import { TodoItem } from "./TodoItem"
import { TodoContext } from "./App"

export function TodoMap() {
  const { todos } = useContext(TodoContext)
  return (
    <ul>
      {todos.map((todo) => {
        return <TodoItem key={todo.id} {...todo} />
      })}
    </ul>
  )
}
