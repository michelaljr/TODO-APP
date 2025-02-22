import { useEffect, useState } from "react";
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./ToDoList";


export default function App () {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect (() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addToDo (title) {
    setTodos((currentTodos) => {
          return [
          ...currentTodos, 
          { id: crypto.randomUUID(), title, completed: false },
          ] 
        })
  }

  function toggleTodo(id, completed){
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          todo.completed = completed
          return { ...todo, completed}
        }
        return todo
      })
    })
  }

  function deleteTodo (id) {
    setTodos ( currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }
  console.log( todos )
  return (
  <> 
    <NewTodoForm onSubmit={addToDo}/>
    <h1 className="header"> Todo List </h1>
    <TodoList todos={todos} 
    toggleTodo={toggleTodo}
    deleteTodo={deleteTodo}/>
    </>
  )
}

