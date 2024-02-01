import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const DataAnalysis = () => {
  const [rejection, setRejection] = useState([]);
  const [LMW, setLMW] = useState([]);
  const [UnivMil, setUnivMil] = useState([]);
  const [Vertex, setVertex] = useState([]);
  const [SPM4, setSPM4] = useState([]);
  const [Grinding, setGrinding] = useState([]);
  const [Lath, setLath] = useState([]);

  useEffect(() => {
    fetchReworkData();
    fetchLMW();
    fetchUnivMil();
    fetchVertex();
    fetchSpm4();
    fetchGrinding();
  }, []);

  const fetchReworkData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/DataAnalysis");
      console.log("DataAnalysis", response.data);
      setRejection(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLMW = async () => {
    try {
      const response = await axios.get("http://localhost:3010/LMW");
      console.log("LMW", response.data);
      setLMW(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchUnivMil = async () => {
    try {
      const response = await axios.get("http://localhost:3010/univmil");
      console.log("UnivMil", response.data);
      setUnivMil(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVertex = async () => {
    try {
      const response = await axios.get("http://localhost:3010/AllData");
      console.log("vertex", response.data);
      setVertex(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSpm4 = async () => {
    try {
      const response = await axios.get("http://localhost:3010/Spm4");
      console.log("vertex", response.data);
      setSPM4(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchGrinding = async () => {
    try {
      const response = await axios.get("http://localhost:3010/Grinding");
      console.log("vertex", response.data);
      setGrinding(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchlath = async () => {
    try {
      const response = await axios.get("http://localhost:3010/Lath");
      console.log("vertex", response.data);
      setLath(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLMW, setIsLMW] = useState(false);
  const [isUnivMil, setIsUnivMil] = useState(false);
  const [isVertex, setIsvertex] = useState(false);
  const [isSPM4, setIsSPM4] = useState(false);
  const [isGringing, setIsgrinding] = useState(false);
  const [isLath, setIslath] = useState(false);

  const handleDataAnalysis = () => {
    setIsOpen(!isOpen);
  };

  const handleLMW = () => {
    setIsLMW(!isLMW);
  };

  const handleUnivMil = () => {
    setIsUnivMil(!isUnivMil);
  };

  const handleVertx = () => {
    setIsvertex(!isVertex);
  };

  const handleSPM4 = () => {
    setIsSPM4(!isSPM4);
  };

  const handleGrinding = () => {
    setIsgrinding(!isGringing);
  }

  const handleLath = () => {
    setIslath(!isLath);
  }

  return (
    <>

      <div>
        {/* <LineChart
          width={500}
          height={300}
          data={rejection}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="MachineName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="X_bar"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="R_val" stroke="#82ca9d" />
        </LineChart> */}
        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
            onClick={handleDataAnalysis}
          >
            SPM5
          </button>
        </Link>
        {isOpen && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={rejection}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={rejection}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
            onClick={handleLMW}
          >
            LMW
          </button>
        </Link>
        {isLMW && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={LMW}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={LMW}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
            onClick={handleUnivMil}
          >
            UnivMil
          </button>
        </Link>
        {isUnivMil && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={UnivMil}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={UnivMil}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
            onClick={handleVertx}
          >
            Vertex
          </button>
        </Link>
        {isVertex && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={Vertex}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={Vertex}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
            onClick={handleSPM4}
          >
            SPM4
          </button>
        </Link>
        {isSPM4 && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={SPM4}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={SPM4}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis" onClick={handleGrinding}
          >
            Grinding
          </button>
        </Link>
        {isGringing && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={Grinding}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={Grinding}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis" onClick={handleLath}
          >
            Lath
          </button>
        </Link>
        {isLath && (
          <>
            <div style={{ display: "flex" }}>
              <LineChart
                width={500}
                height={300}
                data={Grinding}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
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
                data={Grinding}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="" />
                <YAxis />
                <Tooltip />
                <Legend />

                <Line type="monotone" dataKey="R_val" stroke="#c94c4c" />
              </LineChart>
            </div>
          </>
        )}

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
          >
            Drilling
          </button>
        </Link>

        <Link to="/DataAnalysis">
          <button
            style={{ marginLeft: "33px", marginTop: "33px", width: "150px" }}
            className="analysis"
          >
            InspTable
          </button>
        </Link>
      </div>
    </>
  );
};

export default DataAnalysis;