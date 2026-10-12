import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import { ChevronDown, Check } from "lucide-react";
import toast from "react-hot-toast";
import {
  ReceiptText,
  IndianRupee,
  Tags,
  CalendarDays,
  Plus,
  LoaderCircle,
  Sparkles,
} from "lucide-react";

const ExpenseForm = () => {
  const { addExpense } = useExpenses();
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("food");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = [
    { value: "food", label: "Food & Dining", emoji: "🍽️" },
    { value: "transport", label: "Transportation", emoji: "🚗" },
    { value: "entertainment", label: "Entertainment", emoji: "🎬" },
    { value: "shopping", label: "Shopping", emoji: "🛍️" },
    { value: "utilities", label: "Utilities", emoji: "💡" },
    { value: "health", label: "Health & Medical", emoji: "💊" },
    { value: "other", label: "Other", emoji: "📦" },
  ];

  const inputClasses =
    "w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-200 placeholder:text-slate-400 hover:border-violet-200 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    const numericAmount = Number(amount);

    if (!amount || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    setIsSubmitting(true);

    try {
      await addExpense({
        description: description.trim(),
        amount: numericAmount,
        category,
        date,
      });

      toast.success("Expense added successfully");

      setDescription("");
      setAmount("");
      setCategory("food");
      setDate(new Date().toISOString().split("T")[0]);
    } catch (error) {
      console.error("Failed to add expense:", error);
      toast.error("Failed to add expense");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-violet-100 bg-white shadow-lg shadow-violet-100/50">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-600 to-blue-600 px-6 py-6 sm:px-7">
        <div className="pointer-events-none absolute -right-8 -top-12 h-36 w-36 rounded-full bg-white/10" />
        <div className="pointer-events-none absolute -bottom-16 right-20 h-32 w-32 rounded-full bg-blue-300/20" />

        <div className="relative flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/15 text-white shadow-inner backdrop-blur-sm">
            <ReceiptText size={27} />
          </div>

          <div>
            <div className="mb-1 flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                Add New Expense
              </h2>
              <Sparkles size={17} className="text-yellow-200" />
            </div>

            <p className="text-sm text-violet-100">
              Keep track of where your money goes
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-7">
        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <ReceiptText size={16} className="text-violet-600" />
            Description
          </label>

          <input
            type="text"
            id="description"
            placeholder="e.g. Grocery shopping, lunch..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={150}
            className={inputClasses}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Amount */}
        <div>
          <label
            htmlFor="amount"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <IndianRupee size={16} className="text-violet-600" />
            Amount
          </label>

          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-violet-600">
              ₹
            </span>

            <input
              type="number"
              id="amount"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`${inputClasses} pl-10`}
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
        {/* Category */}
        <div className="relative min-w-0">
          <label
            id="category-label"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <Tags size={16} className="text-violet-600" />
            Category
          </label>

          <button
            type="button"
            disabled={isSubmitting}
            aria-labelledby="category-label"
            aria-haspopup="listbox"
            aria-expanded={categoryOpen}
            onClick={() => setCategoryOpen((open) => !open)}
            className="flex w-full min-w-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-left text-sm text-slate-800 transition hover:border-violet-300 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="min-w-0 truncate">
              {
                categoryOptions.find((option) => option.value === category)
                  ?.emoji
              }{" "}
              {
                categoryOptions.find((option) => option.value === category)
                  ?.label
              }
            </span>

            <ChevronDown
              size={18}
              className={`shrink-0 text-violet-600 transition-transform ${
                categoryOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {categoryOpen && (
            <div
              role="listbox"
              aria-labelledby="category-label"
              className="absolute left-0 right-0 top-full z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-violet-100 bg-white p-1.5 shadow-xl shadow-violet-100/70"
            >
              {categoryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={category === option.value}
                  onClick={() => {
                    setCategory(option.value);
                    setCategoryOpen(false);
                  }}
                  className={`flex w-full min-w-0 items-center justify-between gap-2 rounded-lg px-3 py-3 text-left text-sm transition ${
                    category === option.value
                      ? "bg-violet-50 font-semibold text-violet-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <span className="min-w-0 truncate">
                    {option.emoji} {option.label}
                  </span>

                  {category === option.value && (
                    <Check size={17} className="shrink-0 text-violet-600" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label
            htmlFor="date"
            className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
          >
            <CalendarDays size={16} className="text-violet-600" />
            Expense Date
          </label>

          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClasses}
            disabled={isSubmitting}
            required
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-md shadow-violet-200 transition-all duration-200 hover:-translate-y-0.5 hover:from-violet-700 hover:to-blue-700 hover:shadow-lg hover:shadow-violet-200 focus:outline-none focus:ring-4 focus:ring-violet-200 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={19} className="animate-spin" />
              Adding Expense...
            </>
          ) : (
            <>
              <Plus
                size={19}
                className="transition-transform duration-200 group-hover:rotate-90"
              />
              Add Expense
            </>
          )}
        </button>

        <p className="text-center text-xs text-slate-400">
          Your expenses help you understand your spending habits.
        </p>
      </form>
    </section>
  );
};

export default ExpenseForm;
