import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from 'recharts';
import { motion } from 'framer-motion/dist/framer-motion'

const data = [
  
	{name: 'SPM5', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'LMW', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Univ Mil', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Vertex', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Grinding', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Lath', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Drilling', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49},
	{name: 'Insp Table', Utilisation:10,UNSp:20,NoPower:5,Training:12,NoTools:4,Maintanance:49}
  ]


const StackBar = () => {
    return (
        <div className="stackbar-data" style =  {{backgroundColor: '#D4DAD7'}}>
            
    
      <motion.div
        drag
      >
<BarChart width={500} height={500} data={data} margin={{top: 5,right: 20,left: 10,bottom: 5}}>
	
<CartesianGrid />
     {/* <Bar dataKey="Utilization" /> */}
     <XAxis dataKey="name" fontSize={10} />
     <YAxis />
     <Tooltip />
     <Legend />
     <Bar dataKey="Utilisation" stackId="a" fill="#8884d8" />
     <Bar dataKey="UNSp" stackId="a" fill="#82ca9d" />
     <Bar dataKey="NoPower" stackId="a" fill="#ff8a65" />
     {/* <Bar dataKey="UNSp" stackId="a" fill="##ba68c8" /> */}
     <Bar dataKey="Training" stackId="a" fill="#79addc" />
     <Bar dataKey="NoTools" stackId="a" fill="#e8a598" />
     <Bar dataKey="Maintenance" stackId="a" fill="#87bc45" />
    </BarChart>
    </motion.div>

    </div>
);
};

export default StackBar;
 
