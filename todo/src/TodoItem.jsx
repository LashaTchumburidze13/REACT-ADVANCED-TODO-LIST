import { useContext, useRef, useState } from "react"
import { TodoContext } from "./App"

export function TodoItem({ id, name, completed }) {
  const nameRef = useRef()
  const [loading, setLoading] = useState(false)
  const { deleteTodo, toggleCheck, updateTodo } = useContext(TodoContext)

  function handleSubmit(e) {
    if (nameRef.current.value === "") return

    updateTodo(id, nameRef.current.value)

    nameRef.current.value = ""
  }

  return (
    <>
      {loading ? (
        <form onSubmit={handleSubmit}>
          <input ref={nameRef} type="text" />
          <button>Save</button>
        </form>
      ) : (
        <li key={id} className="list-item">
          <label className="list-item-label">
            <input
              checked={completed}
              onChange={(e) => toggleCheck(id, e.target.checked)}
              type="checkbox"
              data-list-item-checkbox
            />
            <span data-list-item-text>{name}</span>
          </label>
          <button onClick={() => setLoading(true)} data-button-edit>
            Edit
          </button>
          <button onClick={(e) => deleteTodo(id)} data-button-delete>
            Delete
          </button>
        </li>
      )}
    </>
  )
}
