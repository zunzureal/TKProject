import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {

    let navigate = useNavigate()

    const [user,setUser] = useState({
        tasklist:"",
        date:""
    });

    const{tasklist,date,datenow} = user;

    useEffect(()=> {
    }, []);

    const reload=()=>window.location.reload();

    const onInputChange=(e) => {
        setUser({ ...user,[e.target.name]:e.target.value });
    };

    const onSubmit= async (e)=> {
        e.preventDefault();
        await axios.post("http://localhost:8080/user",user)
        navigate("/")
    };

    const getUsers = async () => {
        await axios.get("http://localhost:8080/users")
        reload();
    };

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
        <Link className="navbar-brand" to='/'>Reminder</Link>
            <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarSupportedContent" 
            aria-controls="navbarSupportedContent" 
            aria-expanded="false" 
            aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Task
            </button>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Add Task</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                <form onSubmit={(e)=>onSubmit(e)}>
                <div className='form-floating mb-3'>
                    <input 
                    type={'text'}
                    className='form-control'
                    id="Tasklist"
                    placeholder='Enter your tasklist'
                    name='tasklist'
                    value={tasklist}
                    onChange={(e)=>onInputChange(e)}
                    />
                    <label for="Tasklist">
                        Tasklist
                    </label>
                </div>
                <div className='form-floating mb-3'>
                    <input 
                    type={'date'}
                    className='form-control'
                    id='Date'
                    placeholder='Enter your date'
                    name='date'
                    value={date}
                    onChange={(e)=>onInputChange(e)}
                    />
                    <label htmlFor='Date' className='form-label'>
                        Date
                    </label>
                </div>
                <div className='form-floating mb-3'>
                    <input 
                    type={'date'}
                    className='form-control'
                    id='LocalDate'
                    placeholder='Enter your date'
                    name='datenow'
                    value={datenow}
                    onChange={(e)=>onInputChange(e)}
                    />
                    <label htmlFor='Date' className='form-label'>
                        Date
                    </label>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => getUsers()}>Save changes</button>
                </div>
                </form>
                </div>
                </div>
            </div>
            </div>
    </div>
    </nav>
    </div>
  )
}
