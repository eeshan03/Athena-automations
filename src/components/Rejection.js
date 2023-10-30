import React, {useEffect,useState} from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from 'recharts';
import { motion } from 'framer-motion/dist/framer-motion'
import Sidebar from "./SideBar";
import axios from "axios";


 

const Rejection = () => {
	const[rejection,setRejection] = useState([]);
	const[machrejection,setmachrejection] = useState([]);
	
	useEffect(() => {
		fetchReworkData();
	  }, []);
	
	  const fetchReworkData = async () => {
		try {
		  const response = await axios.get('http://localhost:3010/Rejection');
		  console.log('rejection',response.data);
		  setRejection(response.data);
		  setmachrejection(response.data);
		  
		} catch (error) {
		  console.error(error);
		}
	  };
return (
	<>
      <Sidebar />
	  <h1>Rejection</h1>
	<div className="rejection">
	
	<motion.div
        drag
      >
	<BarChart width={400} height={400} data={rejection}>
	<Legend align="left"/>
	<CartesianGrid />
         <Bar dataKey="Utilization" />
         <XAxis dataKey="oprator_name" fontSize={10} />
         <YAxis />
		 <Tooltip />
         <Legend />
		 <Bar dataKey="BoreOS" stackId="a" fill=" #00204a" />
         <Bar dataKey="WidthUS" stackId="a" fill=" #005792" />
		 <Bar dataKey="OCLUS" stackId="a" fill=" #00bbf0" />
         <Bar dataKey="BCDUS" stackId="a" fill="#fdb44b" />
		 <Bar dataKey="ConcNok" stackId="a" fill="#5585b5" />
         <Bar dataKey="ParllNok" stackId="a" fill="#53a8b6" />
		 <Bar dataKey="DentMark" stackId="a" fill=" #bbe4e9" />
		</BarChart>
		</motion.div>

		<motion.div
        drag
      >
	<BarChart width={400} height={400} data={machrejection}>
	<CartesianGrid />
         <Bar dataKey="Utilization" />
         <XAxis dataKey="machine_name" fontSize={10} />
         <YAxis />
		 <Tooltip />
         <Legend />
		 <Bar dataKey="BoreOS" stackId="a" fill=" #00204a" />
         <Bar dataKey="WidthUS" stackId="a" fill=" #005792" />
		 <Bar dataKey="OCLUS" stackId="a" fill=" #00bbf0" />
         <Bar dataKey="BCDUS" stackId="a" fill="#fdb44b" />
		 <Bar dataKey="ConcNok" stackId="a" fill="#5585b5" />
         <Bar dataKey="ParllNok" stackId="a" fill="#53a8b6" />
		 <Bar dataKey="DentMark" stackId="a" fill=" #bbe4e9" />
		</BarChart>	
		</motion.div>

		<motion.div
        drag
      >
	<BarChart width={400} height={400} data={rejection}>
	<CartesianGrid />
         <Bar dataKey="Utilization" />
         <XAxis dataKey="part_name" fontSize={10} />
         <YAxis />
		 <Tooltip />
         <Legend />
		 <Bar dataKey="BoreOS" stackId="a" fill=" #00204a" />
         <Bar dataKey="WidthUS" stackId="a" fill=" #005792" />
		 <Bar dataKey="OCLUS" stackId="a" fill=" #00bbf0" />
         <Bar dataKey="BCDUS" stackId="a" fill="#fdb44b" />
		 <Bar dataKey="ConcNok" stackId="a" fill="#5585b5" />
         <Bar dataKey="ParllNok" stackId="a" fill="#53a8b6" />
		 <Bar dataKey="DentMark" stackId="a" fill=" #bbe4e9" />
		</BarChart> 
		</motion.div>
	</div>
	</>
);
};

export default Rejection;
