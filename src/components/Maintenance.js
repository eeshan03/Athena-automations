import React, { useState , useRef} from 'react';
import './resizing.css';
import Header from './Header';
import CurrentDateTime from './timeanddate';

const Maintenance = () => {
  const contentRef = useRef(null);


  const machineTableData = [
    { machineName: 'Machine 1', downtime: '1 hour', repairReasons: 'Broken part', maintenanceStatus: 'In Maintenance' },
    { machineName: 'Machine 2', downtime: '2 hours', repairReasons: 'Software issue', maintenanceStatus: 'In Maintenance' },
  ];

  // Calculate the number of machines under maintenance and working well
  const totalMachines = machineTableData.length;
  const maintenanceMachines = machineTableData.filter(machine => machine.maintenanceStatus === 'In Maintenance').length;
  const workingMachines = totalMachines - maintenanceMachines;

  return (
    <>
      <Header />
      <CurrentDateTime />

      <div className="mainthead">
          <h1 style={{ textAlign: "center", fontSize:"37px" , color :"#863d3d"  }}>Maintenance</h1>
        </div>

      <div className="currentmaint">
        <div className="maintenancetable">
          <table style={{ margin: "auto", backgroundColor: "fff" }}>
            <tr>
              <th>Machine Name</th>
              <th>Downtime</th>
              <th>Repair / Reasons</th>
              <th>Maintenance Status</th>
            </tr>
            
            {machineTableData.map((machine, index) => (
              <tr key={index}>
                <td>{machine.machineName}</td>
                <td>{machine.downtime}</td>
                <td>{machine.repairReasons}</td>
                <td>{machine.maintenanceStatus}</td>
              </tr>
            ))}
          </table>
        </div>

        <div className='input-container' style={{ display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", marginBottom: "10px", marginTop:"30px" }}> 
        
          {/* Input for the number of machines currently under maintenance */}
          <p>Number of Machines currently under Maintenance: 
          <input
            type="text"
            value={maintenanceMachines} 
            onChange={() => {}} 
            placeholder=""
          />
          </p>
          

          {/* Input for the number of machines working well */}
          <p >Number of Machines working well: 
          <input
            type="text"
            value={workingMachines} 
            onChange={() => {}} 
            placeholder=""
          />

          </p>
          
        </div>
      </div>
      
    </>
  );
}

export default Maintenance;
