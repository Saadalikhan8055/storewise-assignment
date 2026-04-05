import { useState, useEffect } from 'react';
import Task from './Task';

const Board = () => {

  const [totalTasks, setTotalTasks] = useState(2);
  const [date, setDate] = useState("");
  useEffect(() => {
  fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    .then(res => res.json())
    .then(data => setDate(data.datetime));
}, []);
  

  const increment = () => {
    
    setTimeout(() => {
      // a blocking process that should run before we increment totalTasks value
      // this is commented out for the assignment , but we need it to be here
      // blockingFunction()
      
      setTotalTasks(prev => prev + 1);
    }, 500);
  };

useEffect(() => {
  fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata")
    .then(res => res.json())
    .then(data => setDate(data.datetime));
}, []);
 
  return (
    <div className="container">
      <h2>Tasks ({totalTasks})</h2>
      <p>{new Date(date).toLocaleString()}</p>
      <button>Clone Task</button>
      <button onClick={increment}>Create Task</button>
      <div className="task-container">
  {Array.from(Array(totalTasks).keys()).map((i) => (
    <Task key={i} id={i} />
  ))}
</div>
    </div>
  );
};

export default Board;
