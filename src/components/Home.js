import React from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import RadarChart from 'react-svg-radar-chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from 'recharts';
import Sidebar from './SideBar';

const Home = () => {
  const data = [
    {
      data: {
        battery: 0.7,
        design: 0.8,
        useful: 0.9,
        speed: 0.67,
        weight: 0.8,
      },
      meta: { color: '#82ca9d' },
    },
    {
      data: {
        battery: 0.6,
        design: 0.85,
        useful: 0.5,
        speed: 0.6,
        weight: 0.7,
      },
      meta: { color: '#dce775' },
    },
  ];

  const captions = {
    battery: 'Battery Capacity',
    design: 'Design',
    useful: 'Usefulness',
    speed: 'Speed',
    weight: 'Weight',
  };

  return (
    <div>
      <Sidebar />
      <div className="home">
        <StackBar />
        <motion.div drag>
          <RadarChart captions={captions} data={data} size={450} />
        </motion.div>
      </div>
    </div>
  );
};

const StackBar = () => {
  const data = [
    { name: 'SPM5', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'LMW', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Univ Mil', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Vertex', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Grinding', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Lath', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Drilling', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
    { name: 'Insp Table', Utilisation: 10, UNSp: 20, NoPower: 5, Training: 12, NoTools: 4, Maintanance: 49 },
  ];

  return (
    <div className="stackbar-data" style={{ backgroundColor: '#D4DAD7' }}>
      <motion.div drag>
        <BarChart width={500} height={500} data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid />
          <XAxis dataKey="name" fontSize={10} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Utilisation" stackId="a" fill="#8884d8" />
          <Bar dataKey="UNSp" stackId="a" fill="#82ca9d" />
          <Bar dataKey="NoPower" stackId="a" fill="#ff8a65" />
          <Bar dataKey="Training" stackId="a" fill="#79addc" />
          <Bar dataKey="NoTools" stackId="a" fill="#e8a598" />
          <Bar dataKey="Maintenance" stackId="a" fill="#87bc45" />
        </BarChart>
      </motion.div>
    </div>
  );
};

class BarData extends React.Component {
  render() {
    const data = [
      { name: 'Jan', Temperature: 50, fill: 'purple' },
      { name: 'Feb', Temperature: 80, fill: 'darkblue' },
      { name: 'March', Temperature: 65, fill: 'yellow' },
      { name: 'April', Temperature: 100, fill: 'darkred' },
    ];

    return (
      <div className="bar-data">
        <BarChart width={300} height={300} data={data}>
          <Bar dataKey="Temperature" />
          <XAxis dataKey="name" fontSize={10} />
          <YAxis />
        </BarChart>
      </div>
    );
  }
}

export default Home;
