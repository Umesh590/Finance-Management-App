import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { formatCurrency } from "../utils/expenses";

const CATEGORY_COLORS = {
  Food: "#8B5CF6",
  Transport: "#3B82F6",
  Entertainment: "#C084FC",
  Utilities: "#06B6D4",
  Health: "#10B981",
  Shopping: "#F59E0B",
  Other: "#64748B",
};

const ExpensePieChart = ({ data = [] }) => {
  if (data.length === 0) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 px-4 text-center">
        <div>
          <p className="font-semibold text-slate-700">
            No expense data to display
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add expenses to see your category breakdown.
          </p>
        </div>
      </div>
    );
  }

  const getColor = (name) => CATEGORY_COLORS[name] || "#94A3B8";

  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;

    const { name, value } = payload[0].payload;
    const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";

    return (
      <div className="rounded-xl border border-violet-100 bg-white px-4 py-3 shadow-xl shadow-violet-100/60">
        <div className="mb-2 flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: getColor(name) }}
          />
          <p className="text-sm font-semibold text-slate-700">{name}</p>
        </div>

        <p className="text-lg font-bold text-violet-700">
          {formatCurrency(value)}
        </p>

        <p className="mt-1 text-xs text-slate-500">
          {percentage}% of total expenses
        </p>
      </div>
    );
  };

  const renderLegend = (props) => {
    const { payload = [] } = props;

    return (
      <ul className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-3 px-2">
        {payload.map((item) => (
          <li
            key={item.value}
            className="flex items-center gap-2 text-sm text-slate-600"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-medium">{item.value}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-white to-violet-50/40 p-2 sm:p-4">
      <ResponsiveContainer width="100%" height={330}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="46%"
            innerRadius={48}
            outerRadius={95}
            paddingAngle={3}
            cornerRadius={5}
            dataKey="value"
            nameKey="name"
            stroke="#FFFFFF"
            strokeWidth={3}
            animationDuration={800}
            animationBegin={0}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell
                key={`${entry.name}-${index}`}
                fill={getColor(entry.name)}
              />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Legend
            content={renderLegend}
            verticalAlign="bottom"
            align="center"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensePieChart;
