import React, { useState} from 'react'
import { PieChart, Pie } from 'recharts';
import { motion } from 'framer-motion/dist/framer-motion'


const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];
// const data02 = [
//   {
//     "name": "Group A",
//     "value": 2400
//   },
//   {
//     "name": "Group B",
//     "value": 4567
//   },
//   {
//     "name": "Group C",
//     "value": 1398
//   },
//   {
//     "name": "Group D",
//     "value": 9800
//   },
//   {
//     "name": "Group E",
//     "value": 3908
//   },
//   {
//     "name": "Group F",
//     "value": 4800
//   }
// ];
    

export const Piechart = () => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(200);
  const [radi, setRadius] = useState(50);

  const incrementSize = () => {
    setWidth(width+100);
    setHeight(height+100);
    setRadius(radi-50);
  }
  const decrementSize = () => {
    if(width-100<100){
       alert("This is the minimum size! ")
    }
    else if(height-100<250){
      alert("This is the minimum size! ")
   }
    else{
      setWidth(width-100);
      setHeight(height-100);
      setRadius(radi-50);
    }
  }
  return (
    <div className='piechart'>
      <motion.div drag 
      // dragConstraints={{ left: -100, right:-100, top: -100, bottom:-100 }}
      >
      <button onClick={incrementSize}>+</button>
      <button onClick= {decrementSize}>-</button>
      <div>
      <PieChart width={width} height={height} radius= {radi}>
        <Pie data={data01} dataKey="value" nameKey="name" cx="50%" cy="50%"  fill="#ff8a65"  label/>
        {/* <Pie data={data02} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#82ca9d" label /> */}
      </PieChart>
      </div>
      </motion.div>
    </div>          
    
    );
  };
  
  export default Piechart;
