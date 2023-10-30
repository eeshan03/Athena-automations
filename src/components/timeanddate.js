import React, { useState, useEffect } from "react";
import './CurrentDateTime.css';

export function getCurrentDateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div className="current-datetime" >
      <span>{formattedDate}</span>
      <span style={{ margin: "0 8px" }}></span>
      <span>{formattedTime}</span>
    </div>
  );
}

export default getCurrentDateTime;
