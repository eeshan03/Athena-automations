import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import SideBar from "./SideBar";
import LeaveHistory from "./LeaveHistory";

const LeaveManagerData = () => {
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [redirectToUpdateHistory, setRedirectToUpdateHistory] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

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
  
      const { id, user, date_from, date_to, reason } = selectedRow;
  
      const confirmed = window.confirm(
        `Are you sure you want to update the status for ${user}?`
      );
  
      if (confirmed) {
        await axios.post("http://localhost:3005/api/updateStatus", { id });
  
        selectedRow.is_leave_sanctioned = 1;
        setData(updatedData);
  
        setUpdateData((prevData) => [...prevData, selectedRow]);
  
        // Send email to the user
        sendEmailToUser(user, date_from, date_to, reason);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const sendEmailToUser = async (to, dateFrom, dateTo, reason) => {
    // Extract only the date portion
    const formattedDateFrom = new Date(dateFrom).toLocaleDateString();
    const formattedDateTo = new Date(dateTo).toLocaleDateString();
  
    try {
      const response = await axios.post("http://localhost:3008/send-email", {
        to,
        subject: "Leave Sanctioned",
        text: `Your leave from ${formattedDateFrom} \nto ${formattedDateTo} has been sanctioned.\nReason: ${reason}`,
      });
  
      console.log("Email sent:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  
  
  const handleUpdateHistoryClick = () => {
    navigate("/update-history");
  };

  const filteredUpdateData = data.filter(
    (row) => row.is_leave_sanctioned === 1
  );

  return (
    <div>
      <SideBar />
      <button onClick={handleUpdateHistoryClick} style={{ margin: "10px" }}>
        Update History
      </button>
      <div className="app-container">
        {/* Use the Link component for navigation */}
        {/* <Link to="/update-history" style={{ textDecoration: "none" }}>
          <button style={{ cursor: "pointer" }}>Update History</button>
        </Link> */}

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
      {redirectToUpdateHistory && (
        <LeaveHistory updateData={filteredUpdateData} />
      )}
    </div>
  );
};

export default LeaveManagerData;
