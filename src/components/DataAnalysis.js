import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "./SideBar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const DataAnalysis = () => {
  const [SPM5, setSPM5] = useState([]);
  const [LMW, setLMW] = useState([]);
  const [UnivMil, setUnivMil] = useState([]);
  const [Vertex, setVertex] = useState([]);
  const [SPM4, setSPM4] = useState([]);
  const [Grinding, setGrinding] = useState([]);
  const [Lath, setLath] = useState([]);
  const [activeCharts, setActiveCharts] = useState({
    isLMW: false,
    isUnivMil: false,
    isVertex: false,
    isSPM4: false,
    isGrinding: false,
    isLath: false,
  });

  useEffect(() => {
    fetchData("DataAnalysis", setSPM5);
    fetchData("LMW", setLMW);
    fetchData("univmil", setUnivMil);
    fetchData("AllData", setVertex);
    fetchData("Spm4", setSPM4);
    fetchData("Grinding", setGrinding);
    fetchData("Lath", setLath);
  }, []);

  const fetchData = async (endpoint, setData) => {
    try {
      const response = await axios.get(`http://localhost:3010/${endpoint}`);
      console.log(endpoint, response.data);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggle = (stateKey) => {
    setActiveCharts((prevState) => {
      // Reset all active charts to false
      const resetState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});
  
      // Set the new chart to true
      return {
        ...resetState,
        [stateKey]: true,
      };
    });
  };
  

  const renderCharts = (data, title, isButtonActive) => {
    return (
      isButtonActive && (
        <>
          <h2>{title}</h2>
          <div style={{ display: "flex" }}>
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={(_, index) => index} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="X_bar"
                stroke="#c94c4c"
                activeDot={{ r: 8 }}
              />
            </LineChart>
  
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={(_, index) => index} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
            </LineChart>
          </div>
        </>
      )
    );
  };
  
  const getTitle = (activeCharts) => {
    if (activeCharts.isSPM5) {
      return "SPM5 Data";
    } else if (activeCharts.isLMW) {
      return "LMW Data";
    } else if (activeCharts.isUnivMil) {
      return "UnivMil Data";
    } else if (activeCharts.isVertex) {
      return "Vertex Data";
    } else if (activeCharts.isSPM4) {
      return "SPM4 Data";
    } else if (activeCharts.isGrinding) {
      return "Grinding Data";
    } else if (activeCharts.isLath) {
      return "Lath Data";
    } else {
      return "Rework Data"; // Default title
    }
  };
  const buttonStyle = {
    fontSize: "14px",
    padding: "12px 18px", // Top and bottom padding: 12px, Left and right padding: 20px
    margin: "8px", // Top and bottom margin: 8px, Left and right margin: 0
  };
  
  return (
    <>
      <Sidebar />
      <div>
        {/* Buttons */}

<Link to="/manager" style={{ textDecoration: "none" }}>
  <button className="analysis-button back-button" style={buttonStyle}>
    Back
  </button>
</Link>
<button
  className="analysis-button"
  onClick={() => handleToggle("isSPM5")}
  style={buttonStyle}
>
  SPM5
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isLMW")}
  style={buttonStyle}
>
  LMW
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isUnivMil")}
  style={buttonStyle}
>
  UnivMil
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isVertex")}
  style={buttonStyle}
>
  Vertex
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isSPM4")}
  style={buttonStyle}
>
  SPM4
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isGrinding")}
  style={buttonStyle}
>
  Grinding
</button>
<button
  className="analysis-button"
  onClick={() => handleToggle("isLath")}
  style={buttonStyle}
>
  Lath
</button>

        {/* Charts */}
        {renderCharts(SPM5, "SPM5 Data", activeCharts.isSPM5)}
        {renderCharts(LMW, "LMW Data", activeCharts.isLMW)}
        {renderCharts(UnivMil, "UnivMil Data", activeCharts.isUnivMil)}
        {renderCharts(Vertex, "Vertex Data", activeCharts.isVertex)}
        {renderCharts(SPM4, "SPM4 Data", activeCharts.isSPM4)}
        {renderCharts(Grinding, "Grinding Data", activeCharts.isGrinding)}
        {renderCharts(Lath, "Lath Data", activeCharts.isLath)}

        {/* Additional Buttons
        <button className="analysis-button">Drilling</button>
        <button className="analysis-button">InspTable</button> */}
      </div>
    </>
  );
};

export default DataAnalysis;