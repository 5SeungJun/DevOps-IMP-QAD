import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PipelineTrendChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container-wrapper">
        <h3>최근 일주일 Pipeline 실행 추이</h3>
        <div className="empty-data-message">
          파이프라인 실행 추이 데이터가 없습니다.
        </div>
      </div>
    );
  }

  // 데이터의 레포지토리 목록을 동적으로 추출 (cicdplus-frontend, cicdplus-backend 등)
  const repositories = Object.keys(data[0] || {}).filter(key => key !== 'date');
  
  // Area Chart의 각 레포지토리 색상 (이미지 기반)
  const repoColors = {
      "cicdplus-frontend": "#ff7f50", // 산호색 계열
      "cicdplus-backend": "#3cb371", // 연한 녹색 계열
      "cicdplus-qms": "#4682b4",     // 스틸블루 계열
      "cicdplus-portal": "#9370db",   // 임의의 색상
  };

  return (
    <div className="pipeline-trend-chart-wrapper">
      <h3>최근 일주일 Pipeline 실행 추이</h3>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={(tick) => {
                // 날짜 포맷 (예: 1/15)
                const dateParts = tick.split('-');
                return `${dateParts[1]}/${dateParts[2]}`;
            }}/>
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />

            {/* 각 레포지토리에 대한 Area 컴포넌트 동적 생성 */}
            {repositories.map((repo) => (
              <Area
                key={repo}
                type="monotone"
                dataKey={repo}
                stackId="1" // 모든 레포지토리를 스택하여 누적 합계 표시
                stroke={repoColors[repo] || "#8884d8"}
                fill={repoColors[repo] || "#8884d8"}
                name={repo}
                dot={false}
                activeDot={{ r: 6 }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PipelineTrendChart;