// LeaveHistory.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./SideBar";


const LeaveHistory = () => {
  const [updateData, setUpdateData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3005/api/update-history"
        );
        setUpdateData(response.data);
      } catch (error) {
        console.error("Error fetching update history data:", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <div>
      <Sidebar />
      <br />
      <h2 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Update History</h2>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <table className="table" id="updateHistoryTable">
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
          {updateData.map((row, index) => (
            <tr key={index}>
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

export default LeaveHistory;
