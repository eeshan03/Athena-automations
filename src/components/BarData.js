import React from 'react'
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
const data = [
  
    {name: 'Jan', Temperature: 50,fill:'purple' },
    {name: 'Feb', Temperature: 80,fill:'darkblue'},
    {name: 'March', Temperature: 65,fill:'yellow'},
    {name: 'April', Temperature: 100,fill:'darkred'}
  
  ]


class BarData extends Component {
    render() {
      return (
        
        <div className="bar-data">
    <BarChart width={300} height={300} data={data}>
     <Bar dataKey="Temperature" />
     <XAxis dataKey="name" fontSize={10} />
     <YAxis />
     </BarChart>
      </div>
    );
    };
}
    
    export default BarData;
    
