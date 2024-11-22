import React from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartConfig';

const FrequencyDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.categories,
    datasets: [
      {
        label: 'Frequency',
        data: data.counts,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Likelihood Distribution'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Likelihood Score'
        }
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default FrequencyDistributionChart;