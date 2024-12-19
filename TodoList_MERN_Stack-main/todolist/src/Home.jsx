import React, { useState, useEffect } from 'react'; 
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsTrashFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = () => {
        axios.get('http://localhost:3001/todos')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err));
    }

    const handleEdit = (id) => {
        axios.put('http://localhost:3001/todos/' + id)
            .then(result => {
                console.log('Todo updated:', result.data);
                fetchTodos(); 
            })
            .catch(err => console.log(err));
    }

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/todos/' + id)
            .then(result => {
                console.log('Deleted:', result.data);
                fetchTodos(); 
            })
            .catch(err => {
                console.error('Error deleting:', err);
            });
    }

    return (
        <div className='home'>
            <h1>Todo List</h1>
            <Create />
            <br/>
            {
                todos.length === 0 
                ? 
                <div><h2>No record</h2></div>
                :
                todos.map(todo => (
                    <div className='task' key={todo._id}>
                        <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                            {todo.done ? 
                            <BsFillCheckCircleFill className='icon' />
                            :
                            <BsCircleFill className='icon' />
                            }                   
                            <p className={todo.done ? "line_through" : ""}> {todo.task}</p> 
                        </div>
                        <div>
                            <span><BsTrashFill className='icon' 
                            onClick={() => handleDelete(todo._id)}/></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
