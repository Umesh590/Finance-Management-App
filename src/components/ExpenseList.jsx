import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatDate,
  normalizeCategory,
  getCategoryTextColor,
} from "../utils/expenses";
import {
  Trash2,
  Pencil,
  X,
  Check,
  ReceiptText,
  Filter,
  CalendarDays,
  Wallet,
  Tags,
} from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenses();

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);

  const [editValues, setEditValues] = useState({
    description: "",
    amount: "",
    category: "other",
    date: "",
  });

  const categoryOptions = [
    { value: "food", label: "Food & Dining" },
    { value: "transport", label: "Transportation" },
    { value: "entertainment", label: "Entertainment" },
    { value: "shopping", label: "Shopping" },
    { value: "utilities", label: "Utilities" },
    { value: "health", label: "Health & Medical" },
    { value: "other", label: "Other" },
  ];

  const categoryColors = {
    food: "bg-orange-50 text-orange-700 ring-orange-200",
    transport: "bg-blue-50 text-blue-700 ring-blue-200",
    entertainment: "bg-purple-50 text-purple-700 ring-purple-200",
    shopping: "bg-pink-50 text-pink-700 ring-pink-200",
    utilities: "bg-cyan-50 text-cyan-700 ring-cyan-200",
    health: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    other: "bg-slate-100 text-slate-700 ring-slate-200",
  };
  const normalizeCategory = (category = "") => {
    const value = category.toLowerCase().trim();

    const categoryMap = {
      "food & dining": "food",
      transportation: "transport",
      "health & medical": "health",
    };

    return categoryMap[value] || value;
  };

  const filteredExpenses = expenses.filter(
    (expense) =>
      categoryFilter === "all" ||
      normalizeCategory(expense.category) === normalizeCategory(categoryFilter),
  );

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense deleted successfully");
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);

    const parsedDate = new Date(expense.date);
    const isoDate = Number.isNaN(parsedDate.getTime())
      ? ""
      : [
          parsedDate.getFullYear(),
          String(parsedDate.getMonth() + 1).padStart(2, "0"),
          String(parsedDate.getDate()).padStart(2, "0"),
        ].join("-");

    setEditValues({
      description: expense.description || "",
      amount: expense.amount?.toString() || "",
      category: expense.category || "other",
      date: isoDate,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({
      description: "",
      amount: "",
      category: "other",
      date: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveEdit = (id) => {
    if (!editValues.description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    const amountNum = Number(editValues.amount);

    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!editValues.date) {
      toast.error("Please select a date");
      return;
    }

    const updatedExpense = {
      id,
      description: editValues.description.trim(),
      amount: amountNum,
      category: editValues.category,
      date: editValues.date,
    };

    updateExpense(updatedExpense);

    toast.success("Expense updated successfully");
    cancelEdit();
  };

  const getCategoryLabel = (category) =>
    categoryOptions.find((item) => item.value === category)?.label || category;

  return (
    <section className="w-full rounded-2xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6 lg:p-7">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 text-white shadow-md shadow-violet-200">
            <ReceiptText size={23} />
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
              Expense History
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Review and manage your transactions
            </p>
          </div>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 self-start rounded-xl border border-violet-100 bg-violet-50/60 px-3 py-2 sm:self-auto">
          <Filter size={17} className="shrink-0 text-violet-600" />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter expenses by category"
            className="max-w-[190px] cursor-pointer bg-transparent text-sm font-medium text-slate-700 outline-none focus:text-violet-700"
          >
            <option value="all">All Categories</option>

            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transaction count */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Wallet size={16} className="text-violet-500" />
          <span>
            Showing{" "}
            <span className="font-semibold text-slate-800">
              {sortedExpenses.length}
            </span>{" "}
            {sortedExpenses.length === 1 ? "transaction" : "transactions"}
          </span>
        </div>

        {categoryFilter !== "all" && (
          <button
            type="button"
            onClick={() => setCategoryFilter("all")}
            className="text-xs font-semibold text-violet-600 transition hover:text-violet-800"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* Empty state */}
      {sortedExpenses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50/70 to-blue-50/70 px-5 py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-violet-500 shadow-sm">
            <ReceiptText size={30} />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            No expenses found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
            {categoryFilter !== "all"
              ? "There are no transactions in this category. Try selecting another category."
              : "Your expense history will appear here when you add your first transaction."}
          </p>

          {categoryFilter !== "all" && (
            <button
              type="button"
              onClick={() => setCategoryFilter("all")}
              className="mt-5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              View all expenses
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr className="bg-gradient-to-r from-violet-50 to-blue-50">
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Date
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Description
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    Category
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                    Amount
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 bg-white">
                {sortedExpenses.map((expense) => {
                  const isEditing = editingId === expense.id;

                  return (
                    <tr
                      key={expense.id}
                      className="transition-colors duration-200 hover:bg-violet-50/40"
                    >
                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-4">
                        {isEditing ? (
                          <input
                            type="date"
                            name="date"
                            value={editValues.date}
                            onChange={handleChange}
                            className="w-36 rounded-lg border border-violet-200 bg-white px-2 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                          />
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <CalendarDays
                              size={16}
                              className="shrink-0 text-violet-400"
                            />
                            {formatDate(expense.date)}
                          </div>
                        )}
                      </td>

                      {/* Description */}
                      <td className="px-5 py-4">
                        {isEditing ? (
                          <input
                            type="text"
                            name="description"
                            value={editValues.description}
                            onChange={handleChange}
                            maxLength={150}
                            aria-label="Expense description"
                            className="w-56 rounded-lg border border-violet-200 px-3 py-2 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                          />
                        ) : (
                          <div className="font-semibold text-slate-800">
                            {expense.description}
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="whitespace-nowrap px-5 py-4">
                        {isEditing ? (
                          <select
                            name="category"
                            value={editValues.category}
                            onChange={handleChange}
                            aria-label="Expense category"
                            className="max-w-[175px] rounded-lg border border-violet-200 bg-white px-2 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                          >
                            {categoryOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ring-inset ${
                              categoryColors[expense.category] ||
                              "bg-slate-100 text-slate-700 ring-slate-200"
                            }`}
                          >
                            <Tags size={13} />
                            {getCategoryLabel(expense.category)}
                          </span>
                        )}
                      </td>

                      {/* Amount */}
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            name="amount"
                            min="0.01"
                            step="0.01"
                            value={editValues.amount}
                            onChange={handleChange}
                            aria-label="Expense amount"
                            className="w-32 rounded-lg border border-violet-200 px-3 py-2 text-right text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                          />
                        ) : (
                          <span className="font-bold tabular-nums text-slate-800">
                            {formatCurrency(expense.amount)}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center justify-center gap-2">
                          {isEditing ? (
                            <>
                              <button
                                type="button"
                                onClick={() => saveEdit(expense.id)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 hover:shadow-sm"
                                title="Save changes"
                                aria-label="Save expense changes"
                              >
                                <Check size={18} />
                              </button>

                              <button
                                type="button"
                                onClick={cancelEdit}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                                title="Cancel editing"
                                aria-label="Cancel editing"
                              >
                                <X size={18} />
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                type="button"
                                onClick={() => startEdit(expense)}
                                className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl border border-violet-100 bg-violet-50 px-3 text-sm font-semibold text-violet-700 transition hover:border-violet-200 hover:bg-violet-100"
                                title="Edit expense"
                              >
                                <Pencil size={15} />
                                Edit
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDelete(expense.id)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-rose-500 transition hover:bg-rose-50 hover:text-rose-700"
                                title="Delete expense"
                                aria-label="Delete expense"
                              >
                                <Trash2 size={17} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 bg-slate-50/70 px-5 py-3">
            <p className="text-xs text-slate-500">
              Showing the most recent expenses first.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ExpenseList;
