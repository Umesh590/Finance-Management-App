import React from "react";
import { formatCurrency } from "../utils/expenses";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const ExpenseBarChart = ({ data }) => {
  const chartData = Object.entries(data)
    .map(([name, value]) => ({
      name,
      amount: value,
    }))
    .reverse();

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;

    return (
      <div className="rounded-xl border border-violet-100 bg-white px-4 py-3 shadow-xl shadow-violet-100/60">
        <p className="mb-1 text-xs font-medium text-slate-500">{label}</p>
        <p className="text-lg font-bold text-violet-700">
          {formatCurrency(payload[0].value)}
        </p>
      </div>
    );
  };

  if (chartData.length === 0) {
    return (
      <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-gradient-to-br from-violet-50 to-indigo-50 px-4 text-center">
        <div>
          <p className="font-semibold text-slate-700">
            No expense data to display
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Add expenses to see your monthly spending.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl bg-gradient-to-br from-white to-violet-50/40 p-2 sm:p-4">
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={chartData}
          margin={{
            top: 16,
            right: 12,
            left: 4,
            bottom: 35,
          }}
          barCategoryGap="25%"
        >
          <defs>
            <linearGradient id="expenseBarGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="#e9e5f5"
            strokeDasharray="4 5"
            vertical={false}
          />

          <XAxis
            dataKey="name"
            angle={-35}
            textAnchor="end"
            height={65}
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            interval={0}
          />

          <YAxis
            width={65}
            tickFormatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
            tick={{
              fontSize: 11,
              fill: "#64748b",
            }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "#ede9fe", opacity: 0.55 }}
          />

          <Bar
            dataKey="amount"
            name="Expenses"
            fill="url(#expenseBarGradient)"
            radius={[8, 8, 0, 0]}
            maxBarSize={48}
            animationDuration={800}
            animationEasing="ease-out"
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpenseBarChart;
