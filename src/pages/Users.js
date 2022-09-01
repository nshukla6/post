import React, { useEffect, useState } from 'react'
import useOnline from '../hooks/useOnline';

const Users = () => {

  const [users, setUsers] = useState([]);

  const online = useOnline();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(res => {
            setUsers(res);
            // localStorage.setItem('users', JSON.stringify(res));
        })
        .catch((err) => {
            console.log("catch in err ", err);
            // setUsers(JSON.parse(localStorage.getItem('users')));
        })
  }, []);
  return (
    <div>
        <h1 style={{ color: 'red'}}>Users</h1>
        {
            users.map(user => <div key={user.id}>{user.name}</div>)
        }

        <h2>{online? 'Online': 'Offline'}</h2>

    </div>
    
  )
}

export default Users