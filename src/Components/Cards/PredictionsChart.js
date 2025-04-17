/* PredictionsChart.jsx ----------------------------------------------- */
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
import ChartDataLabels from "chartjs-plugin-datalabels";

import { useTheme, alpha } from "@mui/material/styles";  // ⬅️ MUI theme

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

/* Helper → "next_hour" → "Next Hour" */
const prettifyLabel = (key = "") =>
  key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * @param {{ predictionsData?: Record<string, number> }} props
 *   predictionsData = { next_hour: 34, next_day: 31, next_week: 29 }
 */
const PredictionsChart = ({ predictionsData = {} }) => {
  const theme = useTheme();                         // <‑‑ grab current MUI theme

  const textColor   = theme.palette.text.primary;   // white in dark mode
  const gridColor   = alpha(textColor, 0.1);        // subtle grid line
  const tooltipBg   = theme.palette.background.paper;

  const labels = Object.keys(predictionsData).map(prettifyLabel);
  const values = Object.values(predictionsData);

  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: chartColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      datalabels: {
        anchor: "end",
        align: "end",
        formatter: (v) => v,
        font: { weight: "bold", size: 12 },
        color: textColor,                // ← value labels follow theme
      },
      tooltip: {
        backgroundColor: tooltipBg,
        titleColor: textColor,
        bodyColor: textColor,
        borderWidth: 1,
        borderColor: gridColor,
      },
    },
    scales: {
      x: {
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: true,
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
    },
  };

  return (
    /* Let your surrounding MUI component/card supply the dark background.
       No hard‑coded bg color needed here. */
    <Bar data={data} options={options} />
  );
};

export default PredictionsChart;
