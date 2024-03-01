import React, { useState, useEffect } from "react";
import { motion } from "framer-motion/dist/framer-motion";
import RadarChart from "react-svg-radar-chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";
import Axios from "axios";
import Sidebar from "./SideBar";

const Home = () => {
  const [combinedData, setCombinedData] = useState([]);

  useEffect(() => {
    fetchCombinedData();
  }, []);

  const fetchCombinedData = async () => {
    try {
      const tempResponse = await Axios.get(
        "http://localhost:3004/temperature/current"
      );
      const pressureResponse = await Axios.get(
        "http://localhost:3004/pressure/current"
      );
      const vibration1Response = await Axios.get(
        "http://localhost:3004/vibration/sensor1"
      );
      const vibration2Response = await Axios.get(
        "http://localhost:3004/vibration/sensor2"
      );

      const tempData = tempResponse.data.map((item) => ({
        machineId: item.DeviceId ? item.DeviceId.toString() : '',
        machineName: item.MachineName ? item.MachineName.toString() : '',
        temp: item.Temp,
      }));
      
      const pressureData = pressureResponse.data.map((item) => ({
        machineId: item.DeviceId ? item.DeviceId.toString() : '',
        machineName: item.MachineName ? item.MachineName.toString() : '',
        pressure: item.Pressure1,
      }));      

      const vibration1Data = vibration1Response.data.map((item) => ({
        machineId: item.DeviceId.toString(),
        machineName: item.MachineName ? item.MachineName.toString() : '',
        vibration1: item.mean_x,
      }));

      const vibration2Data = vibration2Response.data.map((item) => ({
        machineId: item.DeviceId.toString(),
        machineName: item.MachineName ? item.MachineName.toString() : '',
        vibration2: item.mean_y,
      }));

      const combined = tempData.map((tempItem) => {
        const correspondingPressureItem = pressureData.find(
          (pressureItem) => pressureItem.machineId === tempItem.machineId
        );
        const correspondingVibration1Item = vibration1Data.find(
          (vibration1Item) => vibration1Item.machineId === tempItem.machineId
        );
        const correspondingVibration2Item = vibration2Data.find(
          (vibration2Item) => vibration2Item.machineId === tempItem.machineId
        );
        return {
          machineId: tempItem.machineId,
          machineName: tempItem.machineName,
          temp: tempItem.temp,
          pressure: correspondingPressureItem
            ? correspondingPressureItem.pressure
            : 0,
          vibration1: correspondingVibration1Item
            ? correspondingVibration1Item.vibration1
            : 0,
          vibration2: correspondingVibration2Item
            ? correspondingVibration2Item.vibration2
            : 0,
        };
      });

      setCombinedData(combined);
    } catch (error) {
      console.error("Error fetching combined data:", error);
    }
  };

  const data = [
    {
      data: {
        battery: 0.7,
        design: 0.8,
        useful: 0.9,
        speed: 0.67,
        weight: 0.8,
      },
      meta: { color: "#82ca9d" },
    },
    {
      data: {
        battery: 0.6,
        design: 0.85,
        useful: 0.5,
        speed: 0.6,
        weight: 0.7,
      },
      meta: { color: "#dce775" },
    },
  ];

  const captions = {
    battery: "Battery Capacity",
    design: "Design",
    useful: "Usefulness",
    speed: "Speed",
    weight: "Weight",
  };

  return (
    <div>
      <Sidebar />
      <div className="home">
        <CombinedGraph combinedData={combinedData} />
        <motion.div drag>
          <RadarChart captions={captions} data={data} size={450} />
        </motion.div>
      </div>
    </div>
  );
};

const CombinedGraph = ({ combinedData }) => {
  return (
    <div className="combined-graph-container">
      <h1 style={{ fontSize: "24px", color: "black" }}>Combined Graph</h1>
      <div className="combined-graph">
        <BarChart width={800} height={400} data={combinedData}>
          <CartesianGrid />
          <XAxis dataKey="machineName" fontSize={10} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="temp" stackId="a" fill="#8884d8" />
          <Bar dataKey="pressure" stackId="a" fill="#82ca9d" />
          <Bar dataKey="vibration1" stackId="a" fill="#ffcc00" />
          <Bar dataKey="vibration2" stackId="a" fill="#ff6600" />
        </BarChart>
      </div>
    </div>
  );
};

export default Home;
