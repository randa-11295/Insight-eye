import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Card } from "@mui/material";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Generate distinct colors for cameras
const colors = ["rgb(75, 192, 192)", "rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 206, 86)"];

const processData = (data) => {
  const groupedData = {};
  const uniqueTimestamps = new Set();

  if (data?.length) {
    // Group data by camera_id, date, and time
    data.forEach(({ camera_id, date, time, person_count }) => {
      const timestamp = `${date} ${time}`;

      if (!groupedData[camera_id]) {
        groupedData[camera_id] = {};
      }
      if (!groupedData[camera_id][timestamp]) {
        groupedData[camera_id][timestamp] = 0;
      }

      groupedData[camera_id][timestamp] += person_count;
      uniqueTimestamps.add(timestamp);
    });
  } else {
    // Default empty state (dummy timestamp & 0 count)
    groupedData["camera_0"] = { "0000-00-00 00:00:00": 0 };
    uniqueTimestamps.add("0000-00-00 00:00:00");
  }

  const sortedTimestamps = [...uniqueTimestamps].sort();

  // Convert grouped data into datasets
  const datasets = Object.keys(groupedData).map((camera_id, index) => ({
    label: camera_id,
    data: sortedTimestamps.map((timestamp) => groupedData[camera_id][timestamp] || 0),
    borderColor: colors[index % colors.length],
    fill: false,
    tension: 0.1,
  }));

  return { labels: sortedTimestamps, datasets };
};

const LineChart = ({ chartData = [] }) => {
  const { labels, datasets } = processData(chartData);

  const data = { labels, datasets };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Person Count by Camera Over Time",
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true, // Prevents overcrowding on the x-axis
          maxRotation: 45,
          minRotation: 20,
        },
      },
    },
  };

  return (
    <Card  sx={{ height: "600px"  , padding :"20px"}}>
      <Line data={data} options={options} />
    </Card>
  );
};

export default LineChart;
