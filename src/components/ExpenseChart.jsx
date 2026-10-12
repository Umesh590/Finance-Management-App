import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { getChartData, getExpensesByMonth } from "../utils/expenses";
import {
  BarChart3,
  PieChart,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";
import ExpensePieChart from "./ExpensePieChart";
import ExpenseBarChart from "./ExpenseBarChart";

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  const [chartType, setChartType] = useState("pie");

  const chartData = getChartData(expenses);
  const monthlyData = getExpensesByMonth(expenses);

  const buttonClass = (type) =>
    `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-violet-200 ${
      chartType === type
        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-200"
        : "border border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50 hover:text-violet-700"
    }`;

  return (
    <section className="overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg hover:shadow-violet-100/50">
      {/* Card heading */}
      <div className="border-b border-violet-100 bg-gradient-to-r from-white via-violet-50/50 to-indigo-50/50 px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <ChartNoAxesCombined size={23} />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
                Expense Analytics
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Understand where your money goes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-medium text-violet-700 sm:self-auto">
            <span className="h-2 w-2 rounded-full bg-violet-500" />
            {expenses.length} {expenses.length === 1 ? "expense" : "expenses"}
          </div>
        </div>
      </div>

      {/* Chart selector */}
      <div className="px-5 pt-5 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          <button
            type="button"
            onClick={() => setChartType("pie")}
            aria-pressed={chartType === "pie"}
            className={buttonClass("pie")}
          >
            <PieChart size={18} />
            Pie Chart
          </button>

          <button
            type="button"
            onClick={() => setChartType("bar")}
            aria-pressed={chartType === "bar"}
            className={buttonClass("bar")}
          >
            <BarChart3 size={18} />
            Bar Chart
          </button>
        </div>
      </div>

      {/* Chart content */}
      <div className="min-h-[280px] px-3 pb-5 pt-4 sm:min-h-[340px] sm:px-6 sm:pb-6">
        {expenses.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-600">
              <Sparkles size={30} />
            </div>

            <h3 className="text-lg font-semibold text-slate-800">
              Your analytics start here
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Add your first expense to see your spending patterns, category
              breakdown, and monthly trends.
            </p>
          </div>
        ) : (
          <div className="w-full">
            {chartType === "pie" ? (
              <ExpensePieChart data={chartData} />
            ) : (
              <ExpenseBarChart data={monthlyData} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExpenseChart;
