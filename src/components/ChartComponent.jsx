import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const ChartComponent = ({ chartData, lineVisibility, chartKeyMap }) => {
  // 색상 지정 (한글 라벨 기준)
  const colors = {
    '보안 취약점': '#f44336',
    '보안 경고': '#ff9800',
    '오류': '#9c27b0',
    '개선 권장': '#2196f3',
    '복잡도': '#4caf50',
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          {Object.values(chartKeyMap).map((label) =>
            lineVisibility[label] ? (
              <Line
                key={label}
                type="monotone"
                dataKey={label}
                stroke={colors[label]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ) : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartComponent;
