import React, {  useState, useEffect, useReducer } from "react";
import "./style.css";

const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: throw new Error('Unexpected action');
  }
};

export default function App() {

  const [todos,setTodo]=useState([])
  const [totalTodo,dispatch]=useReducer(reducer, initialState);
  const [colorPosition,setColorPosition]=useState(0);

  function addTodo(todo){
    setTodo([...todos,todo]);
    // setTotalTodo(totalTodo+1)
    dispatch('increment')
    document.getElementById("input-todo").value='';
  }

  function deleteTodo(todo){
    var index=todos.indexOf(todo);
    todos.splice(index,1);
    setTodo([...todos])
    // setTotalTodo(totalTodo-1)
    dispatch('decrement')
  }
  
  // Cuando cambia el total
  useEffect(()=>{
    const colores =['red','green','grey','purple']
    let total= document.getElementById('total');
    if(colorPosition<4){
    setColorPosition(colorPosition+1)
    }else{
      setColorPosition(0)
    }
      total.style.color=colores[colorPosition];
      console.log(totalTodo)
  },[totalTodo])

  // Primer render
  useEffect(()=>{
    console.log('Primer render')
  },[])

  // Por cada cambio 
  useEffect(()=>{
    console.log('has cambiado algo')
  })

  return (
    <div className="app">
    <h2>Mi lista de la compra🛒</h2>

      <input type="text" id="input-todo"/>

      <button 
      onClick={() => {addTodo(document.getElementById("input-todo").value)}}>
      Añadir artículo</button>
      <p >Has añadido <span id="total">{totalTodo}</span> artículos</p>
      <ul>
      {todos.map(todo =>(
        <div className="todoContainer">
          <li className="todoItem" >{todo}</li>
          {/* key={todo} */}
          <button className="todoButton" onClick={() => deleteTodo(todo)}>x</button>          
        </div>
        ))}
      </ul>

    </div>
  );
}
