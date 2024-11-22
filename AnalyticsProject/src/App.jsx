import { useState } from 'react'
import FilterPanel from './FilterPanel'
import PieChart from './PieChart';
import DonutChart from './DonutChart';
import BarChart from './BarChart';
import FrequencyDistributionChart from './FrequencyDistributionChart';
import './App.css'

function App() {
  const [chartData, setChartData] = useState({
    pie: null,
    donut: null,
    bar: null,
    frequencyDistribution: null,
  });

  const handleFilterSubmit = async(formData) => {
    try {
      const response = await fetch('http://localhost:5000/api/getChartData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      // Check if we have successful response with data
      if (result.status === 'success' && result.data) {
        setChartData({
          pie: result.data.pie,
          donut: result.data.donut,
          bar: result.data.bar,
          frequencyDistribution: result.data.frequencyDistribution,
        });
      } else {
        console.error('No data received from server');
      }
    } catch(error) {
      console.error("Error fetching the data:", error);
    }
  };

  return (
    <div className='container'>
      <div className='filter'>
        <FilterPanel handleFilterSubmit={handleFilterSubmit} />
      </div>
      
      <div className='dashboard'>
        <div className='dashboard-name'>Data Visualisation Dashboard</div>
        
        <div className='dashboard-content'> 
          {chartData.pie && chartData.pie.data.length > 0 && (
            <div className="card">
              <h3>Sector Distribution</h3>
              <PieChart data={chartData.pie} />
            </div>
          )}
          
          {chartData.donut && chartData.donut.data.length > 0 && (
            <div className="card">
              <h3>Topic Distribution</h3>
              <DonutChart data={chartData.donut} />
            </div>
          )}
          
          {chartData.bar && chartData.bar.data.length > 0 && (
            <div className="card">
              <h3>Regional Distribution</h3>
              <BarChart data={chartData.bar} />
            </div>
          )}
          
          {chartData.frequencyDistribution && chartData.frequencyDistribution.counts.some(count => count > 0) && (
            <div className="card">
              <h3>Likelihood Distribution</h3>
              <FrequencyDistributionChart data={chartData.frequencyDistribution} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;