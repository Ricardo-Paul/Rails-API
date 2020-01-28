import React, {useState, useEffect} from 'react'
import axios from 'axios';
import TodosContainer from './TodosContainer';
import update from 'immutability-helper'
import '../App.css';

export default function App() {

  const [todos, setTodos] = useState([])
  const [count, setCount] = useState(0)
  const [inputValue, setInputValue] = useState('Hello')

useEffect( () => {
 const fetch = async () => {
    const response = await axios('/api/v1/todos')
    .then(res => {
      setTodos(res.data)
    })
  }
  fetch()
}, [count])

const updateTodo = (e, id) => {
  console.log(e.target.checked)
  axios.put(`/api/v1/todos/${id}`, {
    done: e.target.checked
  })
  .then(res => {
    setTodos(todos)
  })
  setCount(count + 1)
}

const createTodo = (e) => {
  setCount(0)
  if (e.key == "Enter"){
    console.log('Enter was pressed', e.target.value)
    const title = e.target.value
    axios.post('/api/v1/todos', {
      title: title
    })
    .then( res => {
        const todos = update(todos, {
          $splice: [[0, 0, res.data]]
        })
        setTodos(todos)
    })
    setCount(count + 1)
    setInputValue('')
  }
}

const deleteTodo = (e, id) => {
  setCount(0)
  axios.delete(`/api/v1/todos/${id}`)
  .catch(err => {
    console.log(err)
  })
  setCount(count + 1)
}

const handleChange = (e) => {
  setInputValue(e.target.value)
}

  return (
    <div>
      {count}
      {inputValue}
      <TodosContainer 
      todos={todos} 
      createTodo={createTodo} 
      updateTodo={updateTodo} 
      deleteTodo={deleteTodo} 
      handleChange={handleChange}
      inputValue={inputValue}
      />
    </div>
  )
}