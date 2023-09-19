import { createContext, useEffect, useReducer, useState } from "react"
import { TodoForm } from "./TodoForm"
import { TodoFilter } from "./FilterTodo"
import { TodoMap } from "./TodoMap"

const STORAGE = "LOCALSTORAGE"

export const TodoContext = createContext()

const ACTIONS = {
  ADD: "ADD",
  CHECKING: "CHECK",
  DELETE: "DELETE",
  UPDATE: "UPDATE",
}

function reducer(todos, { type, payLoad }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payLoad.name, completed: false, id: crypto.randomUUID() },
      ]
    case ACTIONS.CHECKING:
      return todos.map((todo) => {
        if (todo.id === payLoad.id) {
          return { ...todo, completed: payLoad.completed }
        }
        return todo
      })

    case ACTIONS.DELETE:
      return todos.filter((i) => i.id !== payLoad.id)
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payLoad.id) {
          return { ...todo, name: payLoad.name }
        }
        return todo
      })
  }
}

export default function App() {
  const [filterName, setFilterName] = useState("")
  const [hide, setHide] = useState(false)
  const [todos, dispatch] = useReducer(reducer, [], (initial) => {
    const item = localStorage.getItem(STORAGE)
    if (item == null) return initial

    return JSON.parse(item)
  })
  console.log(todos)

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(todos))
  }, [todos])

  const mainFilter = todos.filter((todo) => {
    if (hide && todo.completed) return false
    return todo.name.includes(filterName)
  })

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payLoad: { name } })
  }

  function toggleCheck(todoId, completed) {
    dispatch({ type: ACTIONS.CHECKING, payLoad: { id: todoId, completed } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payLoad: { id: todoId } })
  }

  function updateTodo(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payLoad: { id, name } })
  }
  return (
    <TodoContext.Provider
      value={{
        todos: mainFilter,
        deleteTodo,
        toggleCheck,
        addNewTodo,
        updateTodo,
      }}
    >
      <TodoMap />
      <TodoFilter
        hide={hide}
        setHide={setHide}
        name={filterName}
        setName={setFilterName}
      />
      <TodoForm addNewTodo={addNewTodo} />
    </TodoContext.Provider>
  )
}
