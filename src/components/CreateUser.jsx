import React, { useState } from 'react';
import Axios from 'axios';
import './CreateUser.css';
import Sidebar from './SideBar';
const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('');

  const handleCreateUser = () => {
    if (!role) {
      setStatus('Please select a role');
      return;
    }

    // Check if the username already exists
    Axios.get(`http://localhost:3010/checkuser/${username}`)
      .then((response) => {
        if (response.data.exists) {
          setStatus('Username already exists. Please choose a different username.');
        } else {
          // If the username doesn't exist, proceed to create the user
          Axios.post('http://localhost:3010/createuser', {
            username: username,
            password: password,
            role: role,
          })
            .then((response) => {
              setStatus('User created successfully');
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error creating user:', error);
              setStatus('Failed to create user');
            });
        }
      })
      .catch((error) => {
        console.error('Error checking username:', error);
        setStatus('Error checking username. Please try again.');
      });
  };

  return (
    <div>
    <Sidebar />
  
    <div className="create-user-container">
      <h2>Create New User</h2>
      <form>
        <label>
          Username (Email):
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select Role</option>
            <option value="operator">Operator</option>
            <option value="manager">Manager</option>
            <option value="maintenance">Maintenance</option>
          </select>
        </label>
        <br />
        <button type="button" onClick={handleCreateUser}>
          Create User
        </button>
        {status && <p className="status">{status}</p>}
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
