import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "./SideBar";

const LeaveManagerData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3005/api/LeaveData");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateStatus = async (index) => {
    try {
      const updatedData = [...data];
      const selectedRow = updatedData[index];
  
      // Assuming you have an 'id' property in each row of your data
      const { id } = selectedRow;
  
      // Show a confirmation dialog
      const confirmed = window.confirm('Are you sure you want to update the status?');
  
      if (confirmed) {
        // Send a request to update the status in the database
        await axios.post("http://localhost:3005/api/updateStatus", { id });
  
        // Update the local state after successful update
        selectedRow.is_leave_sanctioned = 1;
        setData(updatedData);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

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
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
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
                <td>
                  <button onClick={() => handleUpdateStatus(index)}>
                    Update Status
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveManagerData;
