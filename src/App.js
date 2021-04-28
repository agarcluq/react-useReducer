import React, {  useState, useEffect, useRef } from "react";
import "./style.css";


export default function App() {

  const [todos,setTodo]=useState([])
  const [totalTodo,setTotalTodo]=useState(0)
  const [colorPosition,setColorPosition]=useState(0)
  function addTodo(todo){
    setTodo([...todos,todo]);
    setTotalTodo(totalTodo+1)
    document.getElementById("input-todo").value='';
  }

  function deleteTodo(todo){
    var index=todos.indexOf(todo);
    todos.splice(index,1);
    setTodo([...todos])
    setTotalTodo(totalTodo-1)
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
