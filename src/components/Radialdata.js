import React from "react";
import { Legend, Tooltip,RadialBarChart,RadialBar} from 'recharts';
import { motion } from 'framer-motion/dist/framer-motion'

const radialdata = [
	{name:'A', x:1,fill:"green"},
	{name:'B', x:2, fill:"yellow"},
	{name:'C', x:3, fill:"aqua"},
	{name:'D', x:4, fill: "blue"},
	{name:'E', x:5, fill:"orange"},
	{name:'F', x:6, fill:"red"},
	{name:'G', x:7, fill:"black"},
	{name:'H', x:8, fill:"purple"},
	{name:'I', x:9, fill:"gray"},
  ];



const Radialdata = () => {
    return (
      <motion.div
        drag
      >
        <div className="radial-data">   
        
        <RadialBarChart width={250} height={250} data={radialdata}>
        <RadialBar minAngle={15} dataKey="x"/>
        <Tooltip />
        <Legend />
    
        </RadialBarChart>	
        
        
        </div>
        </motion.div>
    );
    };
    
    export default Radialdata;
    