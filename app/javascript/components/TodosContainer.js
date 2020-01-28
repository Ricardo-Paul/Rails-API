import React from 'react'

export default function TodosContainer({todos, createTodo, updateTodo, deleteTodo, inputValue, handleChange}) {
    return (
        <div>
            <div className="inputContainer">
                <label> Task Name </label>
                <input type="text" placeholder="todo..." className="taskInput" maxLength="30"
                onKeyPress={(e) => createTodo(e)}
                value={inputValue}
                onChange={(e) => handleChange(e)}
                />
                <div className="taskListWrapper">
                    <ul className="taskList">
                        {todos.map( (todo) => {
                            let classes = [];
                            if(todo.done){
                                classes.push("done")
                            }
                            return(
                                <li key={todo.id}>
                                    <input type="checkbox" checked={todo.done} onChange={(e) => updateTodo(e, todo.id) } />
                                    <label className={classes.join(" ")} > {todo.title} </label>
                                    <span className="deleteButton" onClick={(e) => deleteTodo(e, todo.id)} > x </span>
                                </li>
                            )
                        } )}
                    </ul>
                </div>
            </div>
        </div>
    )
}
