import React, {  useState, useEffect, useReducer, useRef } from "react";
import "./style.css";
/**
 * Hook tipo reducer para aumentar o reducir
 */
const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    default: throw new Error('Unexpected action');
  }
};
/**
 * Componente Lista de la compra
 */
export default function App() {
  // Lista de tareas/artículos
  const [todos,setTodo]=useState([])
  // Contador de tareas/artículos
  const [totalTodo,dispatch]=useReducer(reducer, initialState);
   // Posición de los colores
  const [colorPosition,setColorPosition]=useState(0);
  // Optener valor input/ acceder
  const inputTodo = useRef()

  // Método Añadir artículo
  const addTodo=(todo)=>{
    setTodo([...todos,todo]);
    dispatch('increment')
    inputTodo.current.value='';
  }

  // Eliminar artículo
  const deleteTodo=(todo)=>{
    var index=todos.indexOf(todo);
    todos.splice(index,1);
    setTodo([...todos])
    dispatch('decrement')
  }
  
  // Efecto que depende del total de artículos
  useEffect(()=>{
    const colors =['red','green','grey','purple']
    let total= document.getElementById('total');
    if(colorPosition<4){
    setColorPosition(colorPosition+1)
    }else{
      setColorPosition(0)
    }
      total.style.color=colors[colorPosition];
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
      <input ref={inputTodo} type="text" />
      <button 
      onClick={() => {addTodo(inputTodo.current.value)}}>
      Añadir artículo</button>
      <p >Has añadido <span id="total">{totalTodo}</span> artículos</p>

      <ul>
      {todos.map(todo =>(
        <div className="todoContainer">
          <li className="todoItem" key={todo}>{todo}</li>
          <button className="todoButton" onClick={() => deleteTodo(todo)}>x</button>          
        </div>
        ))}
      </ul>

    </div>
  );
}
