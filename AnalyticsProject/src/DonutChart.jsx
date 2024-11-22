import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './ChartConfig';

const DonutChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 1
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribution by Topic'
      }
    }
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DonutChart;

