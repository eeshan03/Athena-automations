import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {AuthContext} from './AuthContext';  // Correct the import path
import SideBar from "./SideBar";
import { useNavigate } from "react-router-dom";

const LeaveOperatorData = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for user:", user); // Add this log
        const response = await axios.get('http://localhost:3007/api/LeaveOperatorData', {
          params: { username: user && user.username }
        });
        console.log("Response:", response.data); // Add this log
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle the error, e.g., set an error state
      }
    };
  
    fetchData();
  }, [user && user.username]);
  
  
  

  return (
    <div>
      <SideBar />
      <div className="app-container">
  <table className="table" id="leaveTable">
    <thead>
      <tr>
        <th>ID</th>
        <th>Username</th>
        <th>Name</th>
        <th>Data from</th>
        <th>Date to</th>
        <th>Reason</th>
        <th>Leave duration</th>
        <th>Substitute</th>
        <th>Leave Sanctioned</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row) => (
        <tr key={row.id}>
          <td>{row.id}</td>
          <td>{row.user}</td>
          <td>{row.name}</td>
          <td>{row.date_from}</td>
          <td>{row.date_to}</td>
          <td>{row.reason}</td>
          <td>{row.leave_duration}</td>
          <td>{row.backup_person}</td>
          <td>{row.is_leave_sanctioned}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
};

export default LeaveOperatorData;
