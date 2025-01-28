// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
  // Data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],  // X-axis labels
    datasets: [
      {
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56],  // Y-axis data points
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  // Options for the chart
  const options = {
    responsive: true, 
    maintainAspectRatio: false,  // Allow the chart to take 100% height
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart Example',
      },
      legend: {
        position: 'bottom ',
      },
    },
  };

  return (
      <Line data={data} options={options} />
  );
};

export default LineChart;
