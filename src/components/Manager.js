import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './drop.css';
import Header from './Header';
import CurrentDateTime from './timeanddate';
import { Link } from 'react-router-dom';

const DropdownMenu = ({ options, field, selectedOption, setSelectedOption }) => {
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
        </select>
      </div>
    </td>
  );
};

const Manager = () => {
  const [data, setData] = useState([]);
  const [tableData, setTableData] = useState(() => {
    const storedData = localStorage.getItem('tableData');
    return storedData ? JSON.parse(storedData) : [];
  });
  const [selectedOptions, setSelectedOptions] = useState({});
  const [partsProduced, setPartsProduced] = useState('');
  const [timeRequired, setTimeRequired] = useState('');
  const [customTime, setCustomTime] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3005/api/table');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('tableData', JSON.stringify(tableData));
  }, [tableData]);

  const handleAddClick = async () => {
    const isAnyOptionEmpty = dropdownMenus.some(({ field }) => !selectedOptions[field]);

    if (isAnyOptionEmpty || partsProduced === '' || (timeRequired === 'custom' && customTime === '')) {
      alert('Please select an option for all fields and enter values for Parts Produced and Time Required');
      return;
    }

    const currentDateTime = new Date(); // Current date time as a JavaScript Date object
    const formattedDateTime = currentDateTime.toISOString().slice(0, 19).replace('T', ' '); // Convert to "YYYY-MM-DD HH:mm:ss" format

    const currentRow = {
      ...selectedOptions,
      dateTime: formattedDateTime, // Store the date time in "YYYY-MM-DD HH:mm:ss" format
      parts_produced: partsProduced, // Changed column name to "parts_produced"
      time_taken: timeRequired === 'custom' ? customTime : timeRequired, // Changed column name to "time_taken"
    };
    setTableData((prevTableData) => [...prevTableData, currentRow]);
    setSelectedOptions({});
    setPartsProduced('');
    setTimeRequired('');
    setCustomTime('');

    try {
      // Save the data to the backend database
      await axios.post('http://localhost:3005/api/table', [currentRow]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (index) => {
    const updatedTableData = [...tableData];
    updatedTableData.splice(index, 1);
    setTableData(updatedTableData);
  };

  const dropdownMenus = [
    { id: 1, field: 'name' },
    { id: 2, field: 'part_no' },
    { id: 3, field: 'opn_no' },
    { id: 4, field: 'machine' },
  ];

  const timeOptions = ['30 minutes', '45 minutes', '1 hour', 'custom']; // Add 'custom' option to the time dropdown

  return (
    <>
      <Header />
      <CurrentDateTime />
      <Link to="/DataAnalysis"><button style={{float: 'right', marginRight:'33px'}} className='analysis'>Data Analysis</button></Link>
      <h1 style={{ textAlign: 'center' }}>Manager data</h1>
      <div className="app-container">
        <table className="table" id="mantable">
          <thead>
            <tr>
              {dropdownMenus.map(({ id, field }) => (
                <th key={id}>{field}</th>
              ))}
              <th>dateTime</th> {/* Changed column name */}
              <th>parts_produced</th> {/* Changed column name */}
              <th>time_taken</th> {/* Changed column name */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {dropdownMenus.map(({ id, field }) => (
                <DropdownMenu
                  key={id}
                  options={data}
                  field={field}
                  selectedOption={selectedOptions[field] || ''}
                  setSelectedOption={(value) =>
                    setSelectedOptions((prevSelectedOptions) => ({
                      ...prevSelectedOptions,
                      [field]: value,
                    }))
                  }
                />
              ))}
              <td></td>
              <td>
                <input type="text" id="partsProduced" value={partsProduced} onChange={(e) => setPartsProduced(e.target.value)} />
              </td>
              <td>
                <select value={timeRequired} onChange={(e) => setTimeRequired(e.target.value)}>
                  <option value="">--Select an option--</option>
                  {timeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {timeRequired === 'custom' && ( // Render the text field for custom time if 'custom' is selected
                  <input type="text" value={customTime} onChange={(e) => setCustomTime(e.target.value)} />
                )}
              </td>
              <td>
                <button onClick={handleAddClick}>Add</button>
              </td>
            </tr>
            {tableData.map((row, index) => (
              <tr key={index}>
                {dropdownMenus.map(({ field }) => (
                  <td key={field}>{row[field]}</td>
                ))}
                {/* Format the date time to display both date and time */}
                <td>{row.dateTime}</td>
                <td>{row.parts_produced}</td> {/* Changed column name */}
                <td>{row.time_taken}</td> {/* Changed column name */}
                <td>
                  <button onClick={() => handleDeleteClick(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Manager;




