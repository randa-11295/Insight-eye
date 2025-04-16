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

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const dataObject = {
  camera_id: '226d039d-87a4-495f-a8be-5f6b39a09fff',
  prediction: {
    next_hour: 34,
    next_day: 31,
    next_week: 29,
  },
};

const ChartComponent = () => {
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
    plugins: {
      title: {
        display: true,
        text: `Predicted Counts for Camera `,
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

  return <Bar data={data} options={options} />;
};

export default ChartComponent;
