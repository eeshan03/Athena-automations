import React, { useState } from 'react';
import Axios from 'axios';
import './CreateUser.css';
import Sidebar from './SideBar';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [section, setSection] = useState('');
  const [status, setStatus] = useState('');

  // Function to send an email to the user
  // Function to send an email to the user
const sendEmailToUser = (userEmail) => {
  Axios.post('http://localhost:3008/send-email', {
    to: userEmail,
    subject: 'Welcome to Athena Automation!',
    text: `Thank you for signing up with Athena Automation!\n\n
      Your login details:\n
      Username: ${username}\n
      Password: ${password}\n
      Role: ${role}\n\
      Section: ${section}\n\n`,
  })
    .then((response) => {
      console.log('Email sent:', response.data);
    })
    .catch((error) => {
      console.error('Error sending email:', error);
    });
};


  // Function to handle user creation
  const handleCreateUser = () => {
    if (!role) {
      setStatus('Please select a role');
      return;
    }
    if (!section) {
      setStatus('Please select a section');
      return;
    }

    Axios.get(`http://localhost:3010/checkuser/${username}`)
      .then((response) => {
        if (response.data.exists) {
          setStatus('Username already exists. Please choose a different username.');
        } else {
          Axios.post('http://localhost:3010/createuser', {
            username: username,
            password: password,
            role: role,
            section: section,
          })
            .then((response) => {
              setStatus('User created successfully');

              // Send email to the created user
              const userEmail = username; // Assuming the username is the email address
              sendEmailToUser(userEmail);

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
          <label>
            Section:
            <select value={section} onChange={(e) => setSection(e.target.value)}>
              <option value="">Select Section</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              
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
