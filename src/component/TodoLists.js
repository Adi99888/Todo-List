import React from "react";
import { useState } from "react";
import "./ToDo.css"

const TodoList = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTodo("")

    // if (todo !==""){
    // setTodos([ {id:`${todo}-${Date.now()}`,todo},...todos])}

    //correct way of handling async aperation
    if (todo !== "") {
      setTodos((todos) => {
        const updatetodos = [{ id: `${todo}-${Date.now()}`, todo }, ...todos];
        return updatetodos;
      });
    }

    //handling edit
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    }
  };

  const handleDelete = (id) => {
    const deletedTodo = todos.filter((to) => {
      return to.id !== id;
    });
    setTodos(deletedTodo);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  return (
    <>

    <h1>Enter Your Todo Here:</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type="submit"> {editId ? "edit" : "add"} </button>
      </form>
      {todos.length===0 ? null: <h2>Your List is here</h2>}
      

      <ul>
        {todos.map((t) => {
          return (
            <li key={t.id}>
              {t.todo}

              <button onClick={() => handleEdit(t.id)}> edit </button>

              <button onClick={() => handleDelete(t.id)}>delete</button>
            </li>
          );
        })}
      </ul>


      {todos.length===0 ? null: <button onClick={() => {setTodos([]);}}> Remove ALL </button>}

      
    </>
  );
};

export default TodoList;
