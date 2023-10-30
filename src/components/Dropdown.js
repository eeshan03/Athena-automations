import React, { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";

const Columns = [
  { value: "Temperature", label: "Temperature" },
  { value: "Pressure", label: "Pressure" },
  { value: "RPM", label: "RPM" },
  { value: "Flow", label: "Flow" },
];

const Frequency = [
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
];

const CustomSelects = () => {
  const [selectedMachineID, setSelectedMachineID] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    fetchDeviceName();
  }, []);

  const fetchDeviceName = async () => {
    try {
      const response = await Axios.get('http://localhost:3004/machineid');
      const data = response.data.map((item) => ({
        value: item.Machine,
        label: item.Machine,
      }));
      setMachineData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = () => {
    Axios.put('http://localhost:3006/api/update-frequencies', {
      machineID: selectedMachineID.value,
      column: selectedColumn.value,
      value: selectedFrequency.value,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'right',
        marginTop: '10px',
        marginRight: '10px',
      }}
    >
      <Select
        options={machineData}
        placeholder="Machine ID"
        value={selectedMachineID}
        onChange={setSelectedMachineID}
      />

      <Select
        options={Columns}
        placeholder="Component"
        value={selectedColumn}
        onChange={setSelectedColumn}
      />
      <Select
        options={Frequency}
        placeholder="Frequency"
        value={selectedFrequency}
        onChange={setSelectedFrequency}
      />
      <button
        className="submit"
        style={{
          color: '#fff',
          background: '#646665',
          borderRadius: '0.5rem',
          marginLeft: '5px',
        }}
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default CustomSelects;