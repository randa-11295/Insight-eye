import React from "react";
import { Bar } from "react-chartjs-2";
import { chartColors } from "../../utils/StaticVariables";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// ⬇️ one‑time Chart.js registration
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

/**
 * Helper that turns "next_hour" → "Next Hour"
 * Feel free to tweak if you prefer a different style.
 */
const prettifyLabel = (key = "") =>
  key
    .replace(/_/g, " ")            // snake_case → snake case
    .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize every word

/**
 * @param {{ predictionsData?: Record<string, number> }} props
 * predictionsData example:
 *   { next_hour: 34, next_day: 31, next_week: 29 }
 */
const PredictionsChart = ({ predictionsData = {} }) => {
  // Extract labels and values from the object
  const labels = Object.keys(predictionsData).map(prettifyLabel);
  const values = Object.values(predictionsData);

  // Build the Chart.js‑compatible data object
  const data = {
    labels,
    datasets: [
      {
        data: values,
        // If there are more bars than colors, Chart.js will reuse colors
        backgroundColor: chartColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // allows parent to control height
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
      x: {
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PredictionsChart;
