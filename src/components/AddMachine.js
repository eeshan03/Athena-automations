import React, { useState } from 'react';
import Axios from 'axios';
import "./CreateUser.css"; 
import Sidebar from './SideBar';

const AddMachine = () => {
  const [deviceId, setDeviceId] = useState('');
  const [machineName, setMachineName] = useState('');
  const [section, setSection] = useState('');
  const [status, setStatus] = useState('');

  // Function to handle machine addition
  const handleAddMachine = () => {
    if (!deviceId || !machineName || !section) {
      setStatus('Please fill in all fields');
      return;
    }

    Axios.get(`http://localhost:3010/checkmachine/${deviceId}`)
      .then((response) => {
        if (response.data.exists) {
          setStatus('Device ID already exists. Please choose a different Device ID.');
        } else {
          Axios.post('http://localhost:3010/addmachine', {
            deviceId: deviceId,
            machineName: machineName,
            section: section,
          })
            .then((response) => {
              setStatus('Machine added successfully');
              console.log(response.data);
            })
            .catch((error) => {
              console.error('Error adding machine:', error);
              setStatus('Failed to add machine');
            });
        }
      })
      .catch((error) => {
        console.error('Error checking Device ID:', error);
        setStatus('Error checking Device ID. Please try again.');
      });
  };

  return (
    <div>
      <Sidebar />

      <div className="add-machine-container">
        <h2>Add New Machine</h2>
        <form>
          <label>
            Device ID:
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Machine Name:
            <input
              type="text"
              value={machineName}
              onChange={(e) => setMachineName(e.target.value)}
            />
          </label>
          <br />
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
          <button type="button" onClick={handleAddMachine}>
            Add Machine
          </button>
          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
};

export default AddMachine;
