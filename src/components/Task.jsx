import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const Task = ({ id }) => {

  const [taskName, setTaskName] = useState(null);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
  if (taskName === null) {
    const storedName = sessionStorage.getItem(`task-${id}`);
    const storedStatus = sessionStorage.getItem(`status-${id}`);

    let taskName = `Task #${id+1}`;

    if (!storedName) {
      sessionStorage.setItem(`task-${id}`, `Task #${id+1}`);
    }

    if (storedStatus) {
      setStatus(storedStatus);
    }

    setTaskName(storedName || taskName);
  }
}, [taskName, id]);

 return (
  <div className="card">
    {editing ? (
      <>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <select 
  value={status} 
  onChange={(e) => {
    setStatus(e.target.value);
    sessionStorage.setItem(`status-${id}`, e.target.value);
  }}
>
  <option>Pending</option>
  <option>In Progress</option>
  <option>Completed</option>
</select>
        <button className="edit" onClick={() => {
  sessionStorage.setItem(`task-${id}`, taskName);
  setEditing(false);
}}>
  Save
</button>
      </>
    ) : (
      <>
        <h3>{taskName}</h3>
        <button className="edit" onClick={() => setEditing(true)}>Edit</button>
      </>
    )}

    <button className="delete" onClick={() => {
  sessionStorage.removeItem(`task-${id}`);
  window.location.reload();
}}>
  Delete
</button>
  </div>
);
};

export default Task;
