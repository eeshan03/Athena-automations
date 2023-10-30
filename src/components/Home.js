import React from "react";
import { motion } from 'framer-motion/dist/framer-motion'
import StackBar from "./StackBar"
import Piechart from "./Piechart"
import Sidebar from "./SideBar";
import '../App.css';

import RadarChart from 'react-svg-radar-chart';


const data = [
	{
	  data: {
		battery: 0.7,
		design: .8,
		useful: 0.9,
		speed: 0.67,
		weight: 0.8
	  },
	  meta: { color: '#82ca9d' }
	},
	{
	  data: {
		battery: 0.6,
		design: .85,
		useful: 0.5,
		speed: 0.6,
		weight: 0.7
	  },
	  meta: { color: '#dce775' }
	}
  ];

const captions = {
	// columns
	battery: 'Battery Capacity',
	design: 'Design',
	useful: 'Usefulness',
	speed: 'Speed',
	weight: 'Weight'
  };

const Home = () => {
return (
	<div>
	
      <Sidebar />

	<div className="home">
	    <StackBar/>
	    <Piechart/>
		<motion.div
            drag
            >

		<RadarChart
			captions={captions}
			data={data}
			size={450}
		/>
		</motion.div>
	</div>
	</div>
);
};

export default Home;
