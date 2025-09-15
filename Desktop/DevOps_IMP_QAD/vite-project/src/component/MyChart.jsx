import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const MyChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    new ChartJS(ctx, {
      type: "line", // 소문자 "line" 이어야 함
      data: {
        labels: ["Red", "Blue", "Yellow", "Green"],
        datasets: [
          {
            label: "투표 수",
            data: [12, 19, 3, 5],
            backgroundColor: [
              "rgba(255,99,132,0.5)",
              "rgba(54,162,235,0.5)",
              "rgba(255,206,86,0.5)",
              "rgba(75,192,192,0.5)",
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54,162,235,1)",
              "rgba(255,206,86,1)",
              "rgba(75,192,192,1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: "800px", height: "400px" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default MyChart;
