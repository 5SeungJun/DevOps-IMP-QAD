// components/PipelineTrendMiniChart.jsx
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { formatPipelineData } from "../utils/formatPipelineData";

const COLORS = {
  "cicdplus-frontend": "#FB917D",
  "cicdplus-backend": "#46B5B2",
  "cicdplus-qms": "#50557E",
};
const names = {
  "cicdplus-frontend": "Frontend",
  "cicdplus-backend": "Backend",
  "cicdplus-qms": "QMS",
};

export default function PipelineTrendMiniChart({ apiList }) {
  const data = formatPipelineData(apiList);

  return (
    <div className="bg-white rounded-xl shadow p-4 w-full h-[300px] flex flex-col justify-center">
      <div className="font-bold text-base mb-1">
        최근 일주일 Pipeline 실행 추이
      </div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <XAxis dataKey="date" fontSize={12} />
            <YAxis
              fontSize={12}
              allowDecimals={false}
              domain={[0, "dataMax+10"]}
            />
            <Tooltip />
            <Legend formatter={(v) => names[v]} iconType="circle" height={28} />
            <Area
              type="monotone"
              dataKey="cic
            dplus-frontend"
              stroke={COLORS["cicdplus-frontend"]}
              fillOpacity={0.15}
              fill={COLORS["cicdplus-frontend"]}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="cicdplus-backend"
              stroke={COLORS["cicdplus-backend"]}
              fillOpacity={0.13}
              fill={COLORS["cicdplus-backend"]}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="cicdplus-qms"
              stroke={COLORS["cicdplus-qms"]}
              fillOpacity={0.11}
              fill={COLORS["cicdplus-qms"]}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
