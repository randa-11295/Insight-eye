import { Bar } from 'react-chartjs-2';
import { chartColors } from "../../utils/StaticVariables";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dataObject = {
  camera_id: '226d039d-87a4-495f-a8be-5f6b39a09fff',
  prediction: {
    next_hour: 34,
    next_day: 31,
    next_week: 29,
  },
};

const PredictionsChart = () => {
  const data = {
    labels: ['Next Hour', 'Next Day', 'Next Week'],
    datasets: [
      {
        label: 'Predicted Count',
        data: [
          dataObject.prediction.next_hour,
          dataObject.prediction.next_day,
          dataObject.prediction.next_week,
        ],
        backgroundColor: chartColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow full height
    plugins: {
      title: {
        display: true,
        text: 'Predicted Counts for Camera',
        font: {
          size: 18,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Predicted Count',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Period',
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PredictionsChart;
