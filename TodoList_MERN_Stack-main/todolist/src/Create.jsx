import React from 'react';
import axios from 'axios';

function Create() {
  const [task, setTask] = React.useState('');

  const handleAdd = () => {
    if (!task) {
      alert("Task cannot be empty");
      return;
    }
    
    axios.post('http://localhost:3001/todos', { task: task })
      .then(result => {
        console.log('Todo added:', result.data);
        
        setTask('');
      
        window.location.reload(); 
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="create_form"> 
      <input 
        type="text" 
        placeholder='Enter Task' 
        value={task} 
        onChange={(e) => setTask(e.target.value)} 
      />
      <button type="button" onClick={handleAdd}>Add</button>
    </div>
  );
}

export default Create;
