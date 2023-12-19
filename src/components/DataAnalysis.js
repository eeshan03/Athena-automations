import Sidebar from "./SideBar";
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

  useEffect(() => {
    fetchReworkData();
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

  return (
    <>
      <Sidebar />

      <div>
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
        </LineChart>
        <Link to="/DataAnalysis">
          <button
            style={{ float: "right", marginRight: "33px" }}
            className="analysis"
          >
            Data Analysis
          </button>
        </Link>
      </div>
    </>
  );
};

export default DataAnalysis;
