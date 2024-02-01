import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import CurrentDateTime from "./timeanddate";
import "./Operator.css";
import { motion } from "framer-motion/dist/framer-motion";
// import nodemailer from "nodemailer";
import nodemailer from "nodemailer"; // Adjust the path if necessary
import { Link } from "react-router-dom";
<<<<<<< HEAD
import Header from "./Header";
import LeaveForm from "./leave-form";
=======
import Header from './Header'
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9

const DropdownMenu = ({
  options,
  field,
  setSelectedOptions,
  selectedOptions,
}) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCustomInputChange = (e) => {
    setSelectedOption("custom");
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [field]: e.target.value,
    }));
  };

  useEffect(() => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [field]: selectedOption,
    }));
  }, [selectedOption, field, setSelectedOptions]);

  return (
    <td>
      <div className="dropdown-menu-container">
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="">--Select an option--</option>
          {options.map((option) => (
            <option key={option.id} value={option[field]}>
              {option[field]}
            </option>
          ))}
          <option value="custom">Custom</option>
        </select>
        {selectedOption === "custom" && (
          <input
            type="text"
            placeholder="Enter custom value"
            value={selectedOptions[field]}
            onChange={handleCustomInputChange}
          />
        )}
      </div>
    </td>
  );
};

const Operator = () => {
  const [showAssignedWorkTable, setShowAssignedWorkTable] = useState(false);
  const [showMaintenanceTable, setShowMaintenanceTable] = useState(false);
  const [selectedMachine, setSelectedMachine] = useState("");
  const [symptomMachine, setsymptomMachine] = useState("");
  const [PartMachine, setPartMachine] = useState("");
  const [StatusMachine, setStatusMachine] = useState("");
  const [maintenanceList, setMaintenanceList] = useState([]);
  const [showShifttable, setShowShifttable] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
<<<<<<< HEAD
  const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);
  const [isShiftModalOpen, setShiftModalOpen] = useState(false);
  const [isFeedbackModalOpen, setFeedbackModalOpen] = useState(false);
=======
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
  const contentRef = useRef(null);
  const timerRef = useRef(null);
  const [data, setData] = useState([]);
  const [upperTableData, setUpperTableData] = useState(() => {
    const storedData = localStorage.getItem("upperTableData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [lowerTableData, setLowerTableData] = useState(() => {
    const storedData = localStorage.getItem("lowerTableData");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [selectedOptionsUpper, setSelectedOptionsUpper] = useState({});
  const [selectedOptionsLower, setSelectedOptionsLower] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3007/api/displaytable"
        );
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("upperTableData", JSON.stringify(upperTableData));
  }, [upperTableData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3007/api/table");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem("upperTableData", JSON.stringify(upperTableData));
  }, [upperTableData]);

  useEffect(() => {
    localStorage.setItem("lowerTableData", JSON.stringify(lowerTableData));
  }, [lowerTableData]);

  const handleAddClickUpper = async () => {
    const isAnyOptionEmpty = dropdownMenusUpper.some(
      ({ field }) => !selectedOptionsUpper[field]
    );

    if (isAnyOptionEmpty) {
      alert("Please select an option for all fields");
      return;
    }

    const currentRow = { ...selectedOptionsUpper };

    try {
      await axios.post("http://localhost:3007/api/upper_table", currentRow);
      setUpperTableData((prevTableData) => [...prevTableData, currentRow]);
      setSelectedOptionsUpper({});
    } catch (error) {
      console.error(error);
      alert("Error adding data. Please try again.");
    }
  };

  const handleAddClickLower = async () => {
    const isAnyOptionEmpty = dropdownMenusLower.some(
      ({ field }) => !selectedOptionsLower[field]
    );

    if (isAnyOptionEmpty) {
      alert("Please select an option for all fields");
      return;
    }

    const currentRow = { ...selectedOptionsLower };

    try {
      await axios.post("http://localhost:3007/api/lower_table", currentRow);
      setLowerTableData((prevTableData) => [...prevTableData, currentRow]);
      setSelectedOptionsLower({});
    } catch (error) {
      console.error(error);
      alert("Error adding data. Please try again.");
    }
  };

  const handleDeleteClickUpper = (index) => {
    const updatedTableData = [...upperTableData];
    updatedTableData.splice(index, 1);
    setUpperTableData(updatedTableData);
  };

  const handleDeleteClickLower = (index) => {
    const updatedTableData = [...lowerTableData];
    updatedTableData.splice(index, 1);
    setLowerTableData(updatedTableData);
  };

  const dropdownMenusUpper = [
    { id: 1, field: "operator_name" },
    { id: 2, field: "shift" },
    { id: 3, field: "machine_name" },
<<<<<<< HEAD
    { id: 4, field: "machine_number" },
=======
    { id: 4, field: "part_number" },
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
    { id: 5, field: "operation_number" },
  ];

  const dropdownMenusLower = [
<<<<<<< HEAD
    { id: 8, field: "ok_parts" },
    { id: 7, field: "parts_reworked" },
    { id: 6, field: "parts_rejected" },
    { id: 9, field: "downtime" },
    { id: 10, field: "rework_reasons" },
    { id: 11, field: "rejection_reasons" },
    { id: 12, field: "downtime_reasons" },
=======
    { id: 6, field: "parts_rejected" },
    { id: 7, field: "parts_reworked" },
    { id: 8, field: "ok_parts" },
    { id: 9, field: "downtime" },
    { id: 10, field: "reasons" },
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
  ];

  // const nodemailer = require('nodemailer');

  const handleAssignedWorkClick = () => {
    setShowAssignedWorkTable(!showAssignedWorkTable);
    setShowMaintenanceTable(false);
  };

  const handleMaintenanceClick = () => {
    setShowAssignedWorkTable(false);
    setShowMaintenanceTable(!showMaintenanceTable);
  };

  const handleMachineChange = (event) => {
    event.stopPropagation();
    setSelectedMachine(event.target.value);
  };
  const handlesymptomMachineChange = (event) => {
    event.stopPropagation();
    setsymptomMachine(event.target.value);
  };
  const handlePartMachineChange = (event) => {
    event.stopPropagation();
    setPartMachine(event.target.value);
  };
  const handleStatusMachineChange = (event) => {
    event.stopPropagation();
    setStatusMachine(event.target.value);
  };
  const handleToggleHover = () => {
    setIsHovered(!isHovered);
  };

  // Clear the previous timer, if any
  if (timerRef.current) {
    clearTimeout(timerRef.current);
  }

  // Set a new timer to hide the shift table after 5000 milliseconds (5 seconds)
  timerRef.current = setTimeout(() => {
    setShowShifttable(false);
  }, 5000);

  // Function to handle the button click event
  const handleButtonClick = () => {
    setShowShifttable((prevShowShifttable) => !prevShowShifttable);
  };
<<<<<<< HEAD
  const handleLeaveButtonClick = () => {
    setLeaveModalOpen(!isLeaveModalOpen);
  };

  const handleShiftButtonClick = () => {
    setShiftModalOpen(!isShiftModalOpen);
  };

  const handleFeedbackButtonClick = () => {
    setFeedbackModalOpen(!isFeedbackModalOpen);
  };
  const handleCloseButtonLeave = () => {
    setLeaveModalOpen(false);
  };
  const handleCloseButtonShift = () => {
    setShiftModalOpen(false);
  };
  const handleCloseButtonFeedback = () => {
    setFeedbackModalOpen(false);
  }; 
=======
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9

  const handleSendMaintenanceEmail = async () => {
    const message = window.prompt("Enter your message for maintenance:");
    if (!message) {
      // User canceled the prompt or didn't enter any message
      return;
    }

    // const emailSubject = "Maintenance Request";
    // const emailAddress = "kiranmogal0309@gmail.com";
    // const mailToUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
<<<<<<< HEAD
    // emailSubject
=======
    //   emailSubject
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
    // )}&body=${encodeURIComponent(message)}`;

    // Open the user's default email client with a pre-filled email
    // window.open(mailToUrl);

    if (!selectedMachine || !symptomMachine || !PartMachine || !StatusMachine) {
      // At least one option is not selected, do not add to the table
      return;
    }

    const newMaintenanceItem = {
      machine: selectedMachine,
      symptom: symptomMachine,
      part: PartMachine,
      status: StatusMachine,
      message: message,
    };

    setMaintenanceList([...maintenanceList, newMaintenanceItem]);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ayurvedamart45@gmail.com",
        pass: "hfxtvobbnoxvfmak",
      },
    });

    const options = {
      from: "ayurvedamart45@gmail.com",
      to: "khushiwalje48@gmail.com",
      subject: "hello world",
      html: "hi ",
    };

    await transporter.sendMail(options);

    // Reset the dropdown values
    setSelectedMachine("");
    setsymptomMachine("");
    setPartMachine("");
    setStatusMachine("");
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const targetClass = event.target.className;
      const contentNode = contentRef.current;

      // Check if the click occurred outside the tables or buttons
      if (
        targetClass !== "optable" &&
        targetClass !== "assignbutton" &&
        targetClass !== "maintbutton" &&
        targetClass !== "shifttable-button" &&
        contentNode &&
        !contentNode.contains(event.target)
      ) {
        setShowAssignedWorkTable(false);
        setShowMaintenanceTable(false);
        setShowShifttable(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <>
<<<<<<< HEAD
=======
      <Header />
      <div className="div">
        <div className="nav-bar">
          <div className="child-div1">
            <Link to="/setting">
              <div className="settingtable-wrapper">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`shifttable-button ${isHovered ? "hovered" : ""}`}
                >
                  setting mode
                </motion.button>
              </div>
            </Link>
            <div className="operator-wrapper">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`shifttable-button ${isHovered ? "hovered" : ""}`}
              >
                operation mode
              </motion.button>
            </div>
          </div>
        </div>
        <div className="child-div">
          <CurrentDateTime />
        </div>
      </div>
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
      <div className="Operator-data">
        <div className="ophead">
          <h1 style={{ textAlign: "center" }}>Operator Data</h1>
        </div>
        <p style={{ textAlign: "center" }}>
          Daily production report & Machine details
        </p>
      </div>

      <div
        style={{
          display: "flex",
<<<<<<< HEAD
          justifyContent: "center",
          alignItems: "center",
          // height: '100vh'
          // marginRight: "15px",
=======
          justifyContent: "right",
          marginRight: "15px",
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
        }}
      >
        <div className="shifttable-wrapper">
          <motion.button
<<<<<<< HEAD
            style={{ marginRight: "40px" }}
=======
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`shifttable-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleToggleHover}
            onMouseLeave={handleToggleHover}
<<<<<<< HEAD
            onClick={handleLeaveButtonClick}
          >
            LEAVE
          </motion.button>
          {isLeaveModalOpen && (
            <div className="shifttable-modal">
              <motion.div
                className="shifttable-container"
                initial={{ opacity: 0, scale: 0.9, y: "10%", x: "80%" }}
                animate={{ opacity: 1, scale: 1, y: "10%", x: "80%" }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="close-button"
                  onClick={handleCloseButtonLeave}
                >
                  Close
                </button>
                <LeaveForm>
                  Loading…
                </LeaveForm>
              </motion.div>
              <motion.div
                className="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                onClick={handleButtonClick}
              />
            </div>
          )}
        </div>
        <div className="shifttable-wrapper">
          <motion.button
            style={{ marginRight: "40px" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`shifttable-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleToggleHover}
            onMouseLeave={handleToggleHover}
            onClick={handleShiftButtonClick}
          >
            SHIFTS
          </motion.button>
          {isShiftModalOpen && (
            <div className="shifttable-modal">
              <motion.div
                className="shifttable-container"
                initial={{ opacity: 0, scale: 0.9, y: "10%", x: "80%" }}
                animate={{ opacity: 1, scale: 1, y: "10%", x: "80%" }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="close-button"
                  onClick={handleCloseButtonShift}
                >
                  Close
                </button>
                <table className="shift-table">
                  <tr>
                    <th>Sr No.</th>
                    <th>Shift No.</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Break Start</th>
                    <th>Break End</th>
                    <th>Remarks</th>
                  </tr>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>1</td>
                      <td>7:30 AM</td>
                      <td>4:00 PM</td>
                      <td>11:30 AM</td>
                      <td>12 NOON</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>2</td>
                      <td>4:00 PM</td>
                      <td>12:30 AM</td>
                      <td>8:00 PM</td>
                      <td>8:30 PM</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>3</td>
                      <td>12:30 AM</td>
                      <td>7:30 AM</td>
                      <td>8:00 PM</td>
                      <td>8:30 PM</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>4</td>
                      <td>8:30 AM</td>
                      <td>5:00 PM</td>
                      <td>12:30 PM</td>
                      <td>1:00 PM</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>5</td>
                      <td>8:00 PM</td>
                      <td>4:30 AM</td>
                      <td>12.00 MIDNIGHT</td>
                      <td>12:30 AM</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>6</td>
                      <td>12:00 NOON</td>
                      <td>8:30 PM</td>
                      <td>4:00 PM</td>
                      <td>4:30 PM</td>
                      <td>Regular Shift</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>11</td>
                      <td>4:00 PM</td>
                      <td>8:00 PM</td>
                      <td>4:00 PM</td>
                      <td>4:15 PM</td>
                      <td>Only for Overtime after Shift No 1</td>
                    </tr>
                    <tr>
                      <td>8</td>
                      <td>12</td>
                      <td>12:30 AM</td>
                      <td>4:30 AM</td>
                      <td>12:30 AM</td>
                      <td>12:45 AM</td>
                      <td>Only for Overtime after Shift No 2</td>
                    </tr>
                    <tr>
                      <td>9</td>
                      <td>14</td>
                      <td>5:00 PM</td>
                      <td>7:00 PM</td>
                      <td>5:00 PM</td>
                      <td>5:15 PM</td>
                      <td>Only for Overtime after Shift No 4</td>
                    </tr>
                    <tr>
                      <td>10</td>
                      <td>15</td>
                      <td>4:30 AM</td>
                      <td>7:30 AM</td>
                      <td>4:30 AM</td>
                      <td>4:45 AM</td>
                      <td>Only for Overtime after Shift No 5</td>
                    </tr>
                    <tr>
                      <td>11</td>
                      <td>16</td>
                      <td>8:30 PM</td>
                      <td>12:30 PM</td>
                      <td>8:30 PM</td>
                      <td>8:45 PM</td>
                      <td>Only for Overtime after Shift No 6</td>
                    </tr>
                  </tbody>
                </table>
              </motion.div>
              <motion.div
                className="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                onClick={handleButtonClick}
              />
            </div>
          )}
        </div>
        <div className="shifttable-wrapper">
          <motion.button
            style={{ marginRight: "40px" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`shifttable-button ${isHovered ? "hovered" : ""}`}
            onMouseEnter={handleToggleHover}
            onMouseLeave={handleToggleHover}
            onClick={handleFeedbackButtonClick}
          >
            FEEDBACK
          </motion.button>
          {isFeedbackModalOpen && (
            <div className="shifttable-modal">
              <motion.div
                className="shifttable-container"
                initial={{ opacity: 0, scale: 0.9, y: "10%", x: "80%" }}
                animate={{ opacity: 1, scale: 1, y: "10%", x: "80%" }}
                transition={{ duration: 0.5 }}
              >
                <button
                  className="close-button"
                  onClick={handleCloseButtonFeedback}
                >
                  Close
                </button>
                <iframe
                  title="Feedback Form"
                  src="https://docs.google.com/forms/d/e/1FAIpQLSdf4RgPbdfvrF4YFGFp9HzBxQNcdGaU7wfFvlnvGSjbCREShA/viewform?embedded=true"
                  width="640"
                  height="800"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  style={{ border: "none", width: "100%" }}
                >
                  Loading…
                </iframe>
              </motion.div>
              <motion.div
                className="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                onClick={handleButtonClick}
              />
            </div>
=======
            onClick={handleButtonClick}
          >
            SHIFTS
          </motion.button>
          {isHovered && (
            <motion.div
              className={`shifttable-container ${isHovered ? "visible" : ""}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              ref={contentRef}
            >
              <table className="shift-table">
                <tr>
                  <th>Sr No.</th>
                  <th>Shift No.</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Break Start</th>
                  <th>Break End</th>
                  <th>Remarks</th>
                </tr>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>7:30 AM</td>
                    <td>4:00 PM</td>
                    <td>11:30 AM</td>
                    <td>12 NOON</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>2</td>
                    <td>4:00 PM</td>
                    <td>12:30 AM</td>
                    <td>8:00 PM</td>
                    <td>8:30 PM</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>3</td>
                    <td>12:30 AM</td>
                    <td>7:30 AM</td>
                    <td>8:00 PM</td>
                    <td>8:30 PM</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>4</td>
                    <td>8:30 AM</td>
                    <td>5:00 PM</td>
                    <td>12:30 PM</td>
                    <td>1:00 PM</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>5</td>
                    <td>8:00 PM</td>
                    <td>4:30 AM</td>
                    <td>12.00 MIDNIGHT</td>
                    <td>12:30 AM</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td>6</td>
                    <td>12:00 NOON</td>
                    <td>8:30 PM</td>
                    <td>4:00 PM</td>
                    <td>4:30 PM</td>
                    <td>Regular Shift</td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td>11</td>
                    <td>4:00 PM</td>
                    <td>8:00 PM</td>
                    <td>4:00 PM</td>
                    <td>4:15 PM</td>
                    <td>Only for Overtime after Shift No 1</td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td>12</td>
                    <td>12:30 AM</td>
                    <td>4:30 AM</td>
                    <td>12:30 AM</td>
                    <td>12:45 AM</td>
                    <td>Only for Overtime after Shift No 2</td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td>14</td>
                    <td>5:00 PM</td>
                    <td>7:00 PM</td>
                    <td>5:00 PM</td>
                    <td>5:15 PM</td>
                    <td>Only for Overtime after Shift No 4</td>
                  </tr>
                  <tr>
                    <td>10</td>
                    <td>15</td>
                    <td>4:30 AM</td>
                    <td>7:30 AM</td>
                    <td>4:30 AM</td>
                    <td>4:45 AM</td>
                    <td>Only for Overtime after Shift No 5</td>
                  </tr>
                  <tr>
                    <td>11</td>
                    <td>16</td>
                    <td>8:30 PM</td>
                    <td>12:30 PM</td>
                    <td>8:30 PM</td>
                    <td>8:45 PM</td>
                    <td>Only for Overtime after Shift No 6</td>
                  </tr>
                </tbody>
              </table>
            </motion.div>
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
          )}
        </div>
      </div>

<<<<<<< HEAD
=======
      <div></div>

>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
      <div className="app-container">
        <table className="table" id="upperTable">
          <thead>
            <tr>
              <th>Name</th>
<<<<<<< HEAD
              <th>Machine No</th>
              <th>Opn No</th>
              <th>Machine</th>
              <th>Qty.</th>
              <th>Time</th>
=======
              <th>Part No</th>
              <th>Opn No</th>
              <th>Machine</th>
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{row.name}</td>
<<<<<<< HEAD
                <td>{row.machine_no}</td>
                <td>{row.opn_no}</td>
                <td>{row.machine}</td>
                <td>{row.parts_produced}</td>
                <td>{row.time_taken}</td>
=======
                <td>{row.part_no}</td>
                <td>{row.opn_no}</td>
                <td>{row.machine}</td>
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="app-container">
        <table className="table" id="lowerTable">
          <thead>
            <tr>
              {dropdownMenusLower.map(({ id, field }) => (
                <th key={id}>{field}</th>
              ))}
<<<<<<< HEAD
=======
              <th colSpan="2">
                <button
                  style={{
                    padding: "6px 12px",
                    fontSize: "14px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick={handleAddClickLower}
                >
                  Add
                </button>
              </th>
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
            </tr>
          </thead>
          <tbody>
            <tr>
              {dropdownMenusLower.map(({ id, field }) => (
                <DropdownMenu
                  key={id}
                  options={data}
                  field={field}
                  setSelectedOptions={setSelectedOptionsLower}
                  selectedOptions={selectedOptionsLower}
                />
              ))}
            </tr>
            {lowerTableData.map((row, index) => (
              <tr key={index}>
                {dropdownMenusLower.map(({ field }) => (
                  <td key={field}>{row[field]}</td>
                ))}
                <td>
                  <button
                    style={{
<<<<<<< HEAD
                      padding: "20px 10px",
=======
                      padding: "6px 12px",
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
                      fontSize: "14px",
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                    }}
                    onClick={() => handleDeleteClickLower(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
<<<<<<< HEAD
          <tfoot>
            <tr>
              <td colSpan={dropdownMenusLower.length + 1}>
                <button
                  style={{
                    padding: "12px 30px",
                    fontSize: "15px",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                  onClick={handleAddClickLower}
                >
                  Add
                </button>
              </td>
            </tr>
          </tfoot>
=======
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
        </table>
      </div>

      <div
<<<<<<< HEAD
        className="optable"
        ref={contentRef}
        style={{ marginBottom: "100px" }}
      >
        <table>
          <tr>
            <th>Machine Name</th>
            <th>Symptoms of the problem</th>
            <th>Part Number</th>
            <th>Machine Status</th>
          </tr>
          <tr>
            <td>
              <select value={selectedMachine} onChange={handleMachineChange}>
                <option value="">Select a machine</option>
                <option value="Machine 1">Machine 1</option>
                <option value="Machine 2">Machine 2</option>
                <option value="Machine 3">Machine 3</option>
                {/* Add more options as needed */}
              </select>
            </td>
            <td>
              <select
                value={symptomMachine}
                onChange={handlesymptomMachineChange}
              >
                <option value="">Select symptoms you notice</option>
                <option value="No Power">No Power</option>
                <option value="Strange Noise">Strange Noise</option>
                <option value="Overheating">Overheating</option>
                {/* Add more options as needed */}
              </select>
            </td>
            <td>
              <select value={PartMachine} onChange={handlePartMachineChange}>
                <option value="">Select Part No. of the Machine</option>
                <option value="Part 1"> 1</option>
                <option value="Part 2"> 2</option>
                <option value="Part 3"> 3</option>
                {/* Add more options as needed */}
              </select>
            </td>
            <td>
              <select
                value={StatusMachine}
                onChange={handleStatusMachineChange}
              >
                <option value="">Select Machine Status</option>
                <option value="Working">Working</option>
                <option value="Not Working">Not Working</option>
                {/* Add more options as needed */}
              </select>
            </td>
          </tr>
          <td colSpan={dropdownMenusLower.length + 1}>
            <button
              style={{
                padding: "12px 30px",
                fontSize: "15px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onClick={handleSendMaintenanceEmail}
            >
              Send for Maintenance
            </button>
          </td>
          {/* Additional rows */}
          {maintenanceList.map((item, index) => (
            <tr key={index}>
              <td>{item.machine}</td>
              <td>{item.symptom}</td>
              <td>{item.part}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </table>
      </div>

=======
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
          marginTop: "10px",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      >
        <span style={{ margin: "0 10px" }}></span>
        <button
          className="maintbutton"
          onClick={handleMaintenanceClick}
          style={{ backgroundColor: "#C62828", color: "white" }}
        >
          Maintenance
        </button>
      </div>

      {showMaintenanceTable && (
        <div
          className="optable"
          ref={contentRef}
          style={{ marginBottom: "100px" }}
        >
          <table>
            <tr>
              <th>Machine Name</th>
              <th>Symptoms of the problem</th>
              <th>Part Number</th>
              <th>Machine Status</th>
            </tr>
            <tr>
              <td>
                <select value={selectedMachine} onChange={handleMachineChange}>
                  <option value="">Select a machine</option>
                  <option value="Machine 1">Machine 1</option>
                  <option value="Machine 2">Machine 2</option>
                  <option value="Machine 3">Machine 3</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <select
                  value={symptomMachine}
                  onChange={handlesymptomMachineChange}
                >
                  <option value="">Select symptoms you notice</option>
                  <option value="No Power">No Power</option>
                  <option value="Strange Noise">Strange Noise</option>
                  <option value="Overheating">Overheating</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <select value={PartMachine} onChange={handlePartMachineChange}>
                  <option value="">Select Part No. of the Machine</option>
                  <option value="Part 1"> 1</option>
                  <option value="Part 2"> 2</option>
                  <option value="Part 3"> 3</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <select
                  value={StatusMachine}
                  onChange={handleStatusMachineChange}
                >
                  <option value="">Select Machine Status</option>
                  <option value="Working">Working</option>
                  <option value="Not Working">Not Working</option>
                  {/* Add more options as needed */}
                </select>
              </td>
              <td>
                <button onClick={handleSendMaintenanceEmail}>
                  Send for Maintenance
                </button>
              </td>
            </tr>
            {/* Additional rows */}
            {maintenanceList.map((item, index) => (
              <tr key={index}>
                <td>{item.machine}</td>
                <td>{item.symptom}</td>
                <td>{item.part}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        <marquee behavior="scroll" direction="left">
          FOR SAFETY!! Wear Hand Gloves & Safety glasses while working!
        </marquee>
      </div>
    </>
  );
};

export default Operator;
<<<<<<< HEAD

=======
>>>>>>> 6639066b1b488db793fef7b50f7238243cb3c4c9
