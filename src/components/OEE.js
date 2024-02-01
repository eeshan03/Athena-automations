import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './OEE.css';
import Sidebar from './SideBar';
import axios from 'axios';

const OEEContainer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [oeeData, setOEEData] = useState([]);

  useEffect(() => {
    fetchOEEData();
  }, []);

  const fetchOEEData = async () => {
    try {
      const response = await axios.get('http://localhost:3010/oee');
      console.log('oee',response);
      setOEEData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='oee-container'>
        {oeeData.map((data) => (
          <div key={data.Machine_ID} className='mainoee'>
            <div className='machinex'>
              <h3 className='machine-id'>Machine ID: {data.Machine_ID}</h3>
              <div className='chart-container'>
                <div className='radial-chart-container'>
                  {/* for circular progressbar displaying oee */}
                  {/* <div className='radialBar' style={{  marginTop: '10px',alignItems:'center' }}>
                    <CircularProgressbar
                      value={data.OEE || 0}
                      text={`${data.OEE}%`}
                      styles={buildStyles({
                        textSize: '30px',
                        pathColor: `rgba(255, 0, 0, ${data.OEE / 100})`,
                        textColor: '#000',
                        trailColor: '#d6d6d6',
                        pathRadius: '30%',
                        trailRadius: '40%',
                      })}
                    />
                    <h5 className='chart-heading' style={{ marginLeft: '5px', marginTop: '-5px' }}>
                      OEE Value
                    </h5>
                  </div> */}
                  <div className='pi-chart-container'>
                    <PieChart width={300} height={80}>
                      <Pie
                        data={[
                          { name: 'Availibility', value: data.Availability || 0, fill: '#dce775' },
                          { name: 'Performance', value: data.Performance || 0, fill: '#82ca9d' },
                          { name: 'Quality', value: data.Quality || 0, fill: '#ff8a65' },
                        ]}
                        cx={150}
                        cy={70}
                        innerRadius={30}
                        outerRadius={70}
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={0}
                        dataKey='value'
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                      >
                        {[
                          { name: 'Availibility', value: data.Availability || 0, fill: '#b1cbbb' },
                          { name: 'Performance', value: data.Performance || 0, fill: '#e3eaa7' },
                          { name: 'Quality', value: data.Quality || 0, fill: '#86af49' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, props.payload.name]} active={activeIndex !== null} />
                    </PieChart>
                    <h5 style = {{textAlign:'center'}}>OEE = Availability X Performance X Quality</h5>
                    <h4 style = {{textAlign:'center'}}>{data.OEE}% = {data.Availability}% X {data.Performance}% X {data.Quality}%</h4>
                    
                  </div>

                  <div className='pi-chart-container'>
                    <PieChart width={300} height={80}>
                      <Pie
                        data={[
                          { name: 'Parts Produced', value: data.Parts_produced || 0, fill: '#dce775' },
                          { name: 'Parts Rejected', value: data.Parts_rejected || 0, fill: '#82ca9d' },
                          { name: 'Target', value: data.Target || 0, fill: '#ff8a65' },
                        ]}
                        cx={150}
                        cy={70}
                        innerRadius={30}
                        outerRadius={70}
                        startAngle={180}
                        endAngle={0}
                        paddingAngle={0}
                        dataKey='value'
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                      >
                        {[
                          { name: 'Parts Produced', value: data.Parts_produced || 0, fill: '#dce775' },
                          { name: 'Parts Rejected', value: data.Parts_rejected || 0, fill: '#82ca9d' },
                          { name: 'Target', value: data.Target || 0, fill: '#ff8a65' },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [value, props.payload.name]} active={activeIndex !== null} />
                    </PieChart>
                    <h5 className='chart-heading' style={{ textAlign: 'center' }}>
                      Total Parts
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const OEE = () => {
  return (
    <div>
      <Sidebar />
      <h1>Overall Equipment Effectiveness</h1>
      <OEEContainer />
    </div>
  );
};

export default OEE;

