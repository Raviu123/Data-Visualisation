import React from 'react';
import { Bar } from 'react-chartjs-2';
import './ChartConfig';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Count by Region',
        data: data.data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        text: 'Distribution by Region'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
      }
    }
  };

  return <Bar data={chartData} options={options} />;
};

export default BarChart;

