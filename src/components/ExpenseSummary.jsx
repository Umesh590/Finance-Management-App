import React from "react";
import { useExpenses } from "../context/ExpenseContext";
import {
  formatCurrency,
  getExpensesByCategory,
  getTotalExpenses,
} from "../utils/expenses";
import {
  TrendingDown,
  TrendingUp,
  Wallet,
  ArrowUpRight,
  ReceiptText,
} from "lucide-react";

const ExpenseSummary = () => {
  const { expenses } = useExpenses();

  const totalExpenses = getTotalExpenses(expenses);
  const categoriesData = getExpensesByCategory(expenses);

  let highestCategory = {
    name: "none",
    amount: 0,
  };

  Object.entries(categoriesData).forEach(([category, amount]) => {
    if (amount > highestCategory.amount) {
      highestCategory = { name: category, amount };
    }
  });

  const cards = [
    {
      title: "Total Expenses",
      value: formatCurrency(totalExpenses),
      description: "Your overall spending",
      icon: Wallet,
      iconStyle: "bg-violet-100 text-violet-600",
      accent: "from-violet-500 to-indigo-500",
    },
    {
      title: "Highest Category",
      value:
        highestCategory.name !== "none"
          ? highestCategory.name.charAt(0).toUpperCase() +
            highestCategory.name.slice(1)
          : "None",
      amount:
        highestCategory.name !== "none"
          ? formatCurrency(highestCategory.amount)
          : null,
      description: "Your biggest spending area",
      icon: TrendingUp,
      iconStyle: "bg-rose-100 text-rose-600",
      accent: "from-rose-400 to-pink-500",
    },
    {
      title: "Total Entries",
      value: expenses.length.toLocaleString(),
      description: "Expenses recorded",
      icon: ReceiptText,
      iconStyle: "bg-emerald-100 text-emerald-600",
      accent: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="group relative overflow-hidden rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70 sm:p-6"
          >
            {/* Decorative accent */}
            <div
              className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${card.accent}`}
            />

            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-500">
                  {card.title}
                </p>

                <h3 className="mt-3 break-words text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                  {card.value}
                </h3>

                {card.amount && (
                  <p className="mt-1 break-words text-sm font-medium text-slate-500">
                    {card.amount}
                  </p>
                )}

                <p className="mt-3 text-xs text-slate-400">
                  {card.description}
                </p>
              </div>

              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${card.iconStyle} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon size={24} strokeWidth={2} />
              </div>
            </div>

            <div className="mt-5 flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-medium text-violet-600">
              <ArrowUpRight size={15} />
              <span>Finance overview</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExpenseSummary;
