import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./SideBar";
import axios from "axios";
import "./chartstyle.css";

const Rework = () => {
  const [rework, setRework] = useState([]);
  const [partrework, setPartRework] = useState([]);

  useEffect(() => {
    fetchReworkData();
  }, []);

  const fetchReworkData = async () => {
    try {
      const response = await axios.get("http://localhost:3010/Rework");
      console.log("rework", response.data);
      setRework(response.data);
      setPartRework(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Sidebar />
      <h1>Rework</h1>
      <div className="rework">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={rework}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid />
            <XAxis dataKey="oprator_name" fontSize={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="FaceRework" stackId="a" fill="#93e4c1" />
            <Bar dataKey="BoreRework" stackId="a" fill="#3baea0" />
            <Bar dataKey="RADRework" stackId="a" fill="#118a7e" />
            <Bar dataKey="IDRad" stackId="a" fill="#1f6f78" />
            <Bar dataKey="FinishRough" stackId="a" fill="#90f6d7" />
            <Bar dataKey="MarkMissing" stackId="a" fill="#35bcbf" />
            <Bar dataKey="GrooveRework" stackId="a" fill="#41506b" />
            <Bar dataKey="ParllelRework" stackId="a" fill="#263849" />
          </BarChart>
        </ResponsiveContainer>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={partrework}>
            <CartesianGrid />
            <XAxis dataKey="machine_name" fontSize={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="FaceRework" stackId="a" fill="#93e4c1" />
            <Bar dataKey="BoreRework" stackId="a" fill="#3baea0" />
            <Bar dataKey="RADRework" stackId="a" fill="#118a7e" />
            <Bar dataKey="IDRad" stackId="a" fill="#1f6f78" />
            <Bar dataKey="FinishRough" stackId="a" fill="#90f6d7" />
            <Bar dataKey="MarkMissing" stackId="a" fill="#35bcbf" />
            <Bar dataKey="GrooveRework" stackId="a" fill="#41506b" />
            <Bar dataKey="ParllelRework" stackId="a" fill="#263849" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={partrework}>
            <CartesianGrid />
            <XAxis dataKey="part_name" fontSize={10} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="FaceRework" stackId="a" fill="#93e4c1" />
            <Bar dataKey="BoreRework" stackId="a" fill="#3baea0" />
            <Bar dataKey="RADRework" stackId="a" fill="#118a7e" />
            <Bar dataKey="IDRad" stackId="a" fill="#1f6f78" />
            <Bar dataKey="FinishRough" stackId="a" fill="#90f6d7" />
            <Bar dataKey="MarkMissing" stackId="a" fill="#35bcbf" />
            <Bar dataKey="GrooveRework" stackId="a" fill="#41506b" />
            <Bar dataKey="ParllelRework" stackId="a" fill="#263849" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Rework;
