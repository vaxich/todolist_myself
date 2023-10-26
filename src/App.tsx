import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Todolist } from './Todolist';

function App() {

  const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]


  return (
    <div className="App">
      <Todolist title={"what to lern"} tasks = {tasks1}/>
      <Todolist title={"songs"}  tasks = {tasks2}/>
     

    </div>
  );
}




export default App;
