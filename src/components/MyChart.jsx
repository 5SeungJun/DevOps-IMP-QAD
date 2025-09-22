import './MyChart.css'

import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

// const data = {
//   labels: ["날짜-1", "날짜-2", "날짜-3", "날짜-4"], //날짜 api 
//   datasets: [
//     {
//       label: "프로젝트 품질 점수",
//       data: [12, 19, 3, 5], //점수 
//       borderColor: "rgba(75,100,192,1)",
//       backgroundColor: "rgba(75,192,192,0.2)",
//     },
//   ],
// };

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "프로젝트 검증 히스토리",
      align: "start", //왼쪽 정렬
      color: "black",
      font : {
        size: 18,
        wegiht : "bold"
      },
      padding: {
        top : 10,
        bottom: 20
      }
    },
  },
};

const MyChart = ({project}) => {
  return (
    <div className="mychart">
      <Line data={project.data} options={options} />
    </div>
  );
};

export default MyChart;
