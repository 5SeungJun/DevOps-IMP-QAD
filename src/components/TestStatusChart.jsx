import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TestStatusChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-container-wrapper">
        <h3>레포지토리별 테스트 수행 현황</h3>
        <div className="empty-data-message">
          테스트 현황 데이터가 없습니다.
        </div>
      </div>
    );
  }

  // 차트 색상 및 키 정의 (요청 이미지와 유사하게 설정)
  const chartColors = {
    passed_tests: "#ff7f50", // 성공 (산호색 계열)
    failed_tests: "#3cb371", // 실패 (연한 녹색 계열)
    skipped_tests: "#4682b4", // 스킵 (스틸블루 계열)
  };

  return (
    <div className="test-status-chart-wrapper">
      <h3>레포지토리별 테스트 수행 현황</h3>
      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            layout="horizontal" // 막대를 수직으로 표시
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* X축: 레포지토리 이름 */}
            <XAxis dataKey="repository_name" interval={0} angle={-15} textAnchor="end" height={55} style={{ fontSize: '12px' }}/>
            {/* Y축: 테스트 개수 */}
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} payload={[
                { value: '성공', type: 'square', color: chartColors.passed_tests },
                { value: '실패', type: 'square', color: chartColors.failed_tests },
                { value: '스킵', type: 'square', color: chartColors.skipped_tests },
            ]}/>

            {/* 스택 바 (passed_tests, failed_tests, skipped_tests) */}
            <Bar dataKey="passed_tests" stackId="a" fill={chartColors.passed_tests} name="성공" />
            <Bar dataKey="failed_tests" stackId="a" fill={chartColors.failed_tests} name="실패" />
            <Bar dataKey="skipped_tests" stackId="a" fill={chartColors.skipped_tests} name="스킵" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TestStatusChart;