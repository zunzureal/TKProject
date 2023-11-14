import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {


    const [users,setUsers] = useState([])
    //const {id} = useParams()
    
    useEffect(()=> {
        loadUsers();
    },[]);

    const loadUsers= async()=> {
        const result= await axios.get("http://localhost:8080/users");
        setUsers(result.data);
    };

    const deleteUsers = async(id) => {
        await axios.delete(`http://localhost:8080/user/${id}`);
        loadUsers();
    }

  return (
    <div className='container'>
        <div className='py-4'>
            <table className="table border shadow">
                <thead>
                    <tr>
                    <th scope="col">Task Number</th>
                    <th scope='col'>Tasklist</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user,index)=>(
                            <tr>
                                <th scope="row" key={index}>
                                    {index + 1}
                                </th>
                                <td>{user.tasklist}</td>
                                <td>{user.date}</td>
                                <td>
                                    <Link className='btn btn-primary mx-2' to={`/viewuser/${user.id}`}>View</Link>
                                    <Link className='btn btn-outline-primary mx-2' to={`/edituser/${user.id}`}>Edit</Link>
                                    <button className='btn btn-danger mx-2' onClick={() => deleteUsers(user.id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}
