import React, { useState } from "react";
import axios from "axios";

const LeaveForm = () => {
  const [user, setUser] = useState("")
  const [name, setName] = useState("");
  // const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [reason, setReason] = useState("");
  const [leaveDuration, setLeaveDuration] = useState("");
  const [backupPerson, setBackupPerson] = useState("");
  const [isLeaveSanctioned, setIsLeaveSanctioned] = useState("Sanctioned");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform actions with form data, e.g., send to server or handle locally
    const formData = {
      user,
      name,
      // status,
      date_from: dateFrom,
      date_to: dateTo,
      reason,
      leave_duration: leaveDuration,
      backup_person: backupPerson,
      // is_leave_sanctioned: isLeaveSanctioned === "Sanctioned" ? 0 : 1,
      is_leave_sanctioned: isLeaveSanctioned === "Sanctioned" ? 0 : (isLeaveSanctioned === "Not Sanctioned" ? 1 : 0),
    };

    try {
      // Send form data to the server
      await axios.post("http://localhost:3007/api/leave_data", formData);

      // Clear form fields after submission
      setUser("")
      setName("");
      setDateFrom("");
      setDateTo("");
      setReason("");
      setLeaveDuration("");
      setBackupPerson("");
      setIsLeaveSanctioned("Sanctioned");
      // setStatus("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Athena Automation Leave Form</h2>
      <form onSubmit={handleFormSubmit} style={styles.form}>
      <label style={styles.label}>
          Username:
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </label>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Date from:
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Date to:
          <input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Reason:
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          Leave duration:
          <input
            type="text"
            value={leaveDuration}
            onChange={(e) => setLeaveDuration(e.target.value)}
            required
          />
        </label>
        <br />
        <label style={styles.label}>
          In my absence, my work will be looked after by Mr./Ms.:
          <input
            type="text"
            value={backupPerson}
            onChange={(e) => setBackupPerson(e.target.value)}
            required
          />
        </label>

        <button style={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
    fontSize: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    marginBottom: "8px",
    color: "#555",
    fontSize: "16px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    marginBottom: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "12px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default LeaveForm;