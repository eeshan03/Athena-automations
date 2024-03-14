import React, { useState, useRef } from "react";
import "./resizing.css";
import Header from "./Header";
import CurrentDateTime from "./timeanddate";
import "./Maintenance.css";

const Maintenance = () => {
  const contentRef = useRef(null);

  const machineTableData = [
    {
      machineName: "Machine 1",
      downtime: "1hr",
      repairReasons: "Broken part",
      allotment_time: "30min",
      diagnosis: "Broken",
      correction_time: "15min",
      maintenanceStatus: "In Maintenance",
    },
    {
      machineName: "Machine 2",
      downtime: "2hrs",
      repairReasons: "Software issue",
      allotment_time: "30min",
      diagnosis: "Broken",
      correction_time: "15min",
      maintenanceStatus: "In Maintenance",
    },
  ];

  // Calculate the number of machines under maintenance and working well
  const totalMachines = machineTableData.length;
  const maintenanceMachines = machineTableData.filter(
    (machine) => machine.maintenanceStatus === "In Maintenance"
  ).length;
  const workingMachines = totalMachines - maintenanceMachines;

  return (
    <>
      <Header />
      <CurrentDateTime />

      <div className="mainthead">
        <h1 style={{ textAlign: "center", fontSize: "37px", color: "#863d3d" }}>
          Maintenance
        </h1>
      </div>
      <div className="currentmain">
        <table className="maintenancetable" id="upperTable">
          <thead>
            <tr>
              <th>Machine Name</th>
              <th>Downtime</th>
              <th>Repair</th>
              <th>Allotment Time</th>
              <th>Diagnosis</th>
              <th>Correction Time</th>
              <th>Maintenance Status</th>
            </tr>
          </thead>
          <tbody>
            {machineTableData.map((machine, index) => (
              <tr key={index}>
                <td>{machine.machineName}</td>
                <td>{machine.downtime}</td>
                <td>{machine.repairReasons}</td>
                <td>{machine.allotment_time}</td>
                <td>{machine.diagnosis}</td>
                <td>{machine.correction_time}</td>
                <td>{machine.maintenanceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="input-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            marginBottom: "10px",
            marginTop: "30px",
          }}
        >
          {/* Input for the number of machines currently under maintenance */}
          <p>
            Number of Machines currently under Maintenance:{" "}
            <span>{maintenanceMachines}</span>
          </p>

          {/* Display the number of machines working well */}
          <p>
            Number of Machines working well: <span>{workingMachines}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Maintenance;
