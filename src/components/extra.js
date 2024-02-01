import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, Tooltip} from 'recharts';
import { motion } from 'framer-motion/dist/framer-motion';
import Sidebar from "./SideBar";


const rework = [
	{name:'NP',FaceRework:5, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'AP',FaceRework:3, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'SP',FaceRework:0, BoreRework:1,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'SS',FaceRework:2, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'SK',FaceRework:0, BoreRework:0,RADRework:2,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'AW',FaceRework:4, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:3},
	{name:'IR',FaceRework:3, BoreRework:1,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'PC',FaceRework:0, BoreRework:0,RADRework:0,IDRad:0,FinishRough:1,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'SM',FaceRework:1, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'SP',FaceRework:6, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:2,GrooveRework:0,ParllelRework:0},
  ]
  
  const partrework = [
	{name:'51Z',FaceRework:5, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'30Z',FaceRework:3, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'41Z',FaceRework:0, BoreRework:1,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'3016826',FaceRework:2, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'3062141',FaceRework:0, BoreRework:0,RADRework:2,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'3081248',FaceRework:4, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:3},
	{name:'3017511',FaceRework:3, BoreRework:1,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'3062096',FaceRework:0, BoreRework:0,RADRework:0,IDRad:0,FinishRough:1,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'4009479',FaceRework:1, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:0,GrooveRework:0,ParllelRework:0},
	{name:'3092502',FaceRework:6, BoreRework:0,RADRework:0,IDRad:0,FinishRough:0,MarkMissing:2,GrooveRework:0,ParllelRework:0},
  ]



const Rework = () => {
	
	
    return (

		<>
      <Sidebar />
        <div className="rework">
			<h1>Rework</h1>
        <div className = "container" >
	<motion.div
        drag
      >
	<BarChart width={500} height={500} data={rework}margin={{top: 5,right: 20,left: 10,bottom: 5}}>
	

	<BarChart className="op-rework"></BarChart>
	<CartesianGrid />
         <Bar dataKey="Utilization" />
         <XAxis dataKey="name" fontSize={10} />
         <YAxis />
		 <Tooltip />
         <Legend />
		 <Bar dataKey="FaceRework" stackId="a" fill="#8884d8" />
         <Bar dataKey="BoreRework" stackId="a" fill="#82ca9d" />
		 <Bar dataKey="RADRework" stackId="a" fill="#ff8a65" />
         <Bar dataKey="IDRad" stackId="a" fill="##ba68c8" />
		 <Bar dataKey="FinishRough" stackId="a" fill="#ffa000" />
         <Bar dataKey="MarkMissing" stackId="a" fill="#82ca9d" />
		 <Bar dataKey="GrooveRework" stackId="a" fill="#673ab7" />
		 <Bar dataKey="ParllelRework" stackId="a" fill="#8bc34a" />

        </BarChart>	
		</motion.div>
	</div>
	<motion.div
	drag
	>
	<BarChart width={500} height={500} data={partrework}>
	<CartesianGrid />
         <Bar dataKey="Utilization" />
         <XAxis dataKey="name" fontSize={10} />
         <YAxis />
		 <Tooltip />
         <Legend />
		 <Bar dataKey="FaceRework" stackId="a" fill="#8884d8" />
         <Bar dataKey="BoreRework" stackId="a" fill="#82ca9d" />
		 <Bar dataKey="RADRework" stackId="a" fill="#ff8a65" />
         <Bar dataKey="IDRad" stackId="a" fill="##ba68c8" />
		 <Bar dataKey="FinishRough" stackId="a" fill="#ffa000" />
         <Bar dataKey="MarkMissing" stackId="a" fill="#82ca9d" />
		 <Bar dataKey="GrooveRework" stackId="a" fill="#673ab7" />
		 <Bar dataKey="ParllelRework" stackId="a" fill="#8bc34a" />

		</BarChart>	
		</motion.div>
</div>
</>
);
};

export default Rework;            