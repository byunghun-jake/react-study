import React, { useCallback, useState } from "react"

function ToDoList() {
  const [todo, setTodo] = useState("")
  const [todoError, setTodoError] = useState("")

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (todo.length === 0) {
        setTodoError("할 일을 입력하세요")
        return
      }
      alert(todo)
      setTodo("")
      setTodoError("")
    },
    [todo]
  )

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할일을 입력하세요"
          value={todo}
          onChange={handleChange}
        />
        {!!todoError && <span>{todoError}</span>}
        <button>추가</button>
      </form>
      <p>{todo}</p>
    </div>
  )
}

export default ToDoList
