import React, { useState } from "react";
import { useExpenses } from "../context/ExpenseContext";
import toast from "react-hot-toast";
import {
  formatCurrency,
  formatDate,
  getCategoryTextColor,
} from "../utils/expenses";
import { Trash2, Edit2, X, Check } from "lucide-react";

const ExpenseList = () => {
  const { expenses, deleteExpense, updateExpense } = useExpenses();
  const [categoryFilter, setCategoryFilter] = useState("all");

  // local editing state
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

  const filteredExpenses = expenses.filter(
    (expense) => categoryFilter === "all" || expense.category === categoryFilter
  );

  const sortedExpenses = [...filteredExpenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id) => {
    deleteExpense(id);
    toast.success("Expense deleted successfully");
  };

  const startEdit = (expense) => {
    setEditingId(expense.id);
    const isoDate = new Date(expense.date).toISOString().split("T")[0];
    setEditValues({
      description: expense.description || "",
      amount: expense.amount?.toString() || "",
      category: expense.category || "other",
      date: isoDate,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({ description: "", amount: "", category: "other", date: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = (id) => {
    // basic validation
    if (!editValues.description.trim()) {
      toast.error("Description required");
      return;
    }
    const amountNum = Number(editValues.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!editValues.date) {
      toast.error("Date required");
      return;
    }

    const updatedExpense = {
      id,
      description: editValues.description.trim(),
      amount: amountNum,
      category: editValues.category,
      date: editValues.date,
    };

    // <-- IMPORTANT: your context expects the whole expense object
    updateExpense(updatedExpense);

    toast.success("Expense updated");
    cancelEdit();
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-expense-dark">
          Expense History
        </h2>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-1 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-expense-light focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {categoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {sortedExpenses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center text-gray-500">
          <p className="mb-2">No expenses found</p>
          {categoryFilter !== "all" && (
            <p>Try changing the category filter or add new expenses.</p>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {sortedExpenses.map((expense) => {
                  const isEditing = editingId === expense.id;
                  return (
                    <tr
                      key={expense.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {isEditing ? (
                          <input
                            type="date"
                            name="date"
                            value={editValues.date}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded-md w-36"
                          />
                        ) : (
                          formatDate(expense.date)
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {isEditing ? (
                          <input
                            type="text"
                            name="description"
                            value={editValues.description}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded-md w-64"
                          />
                        ) : (
                          expense.description
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {isEditing ? (
                          <select
                            name="category"
                            value={editValues.category}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded-md"
                          >
                            {categoryOptions.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span
                            className={`${getCategoryTextColor(
                              expense.category
                            )} font-medium`}
                          >
                            {expense.category.charAt(0).toUpperCase() +
                              expense.category.slice(1)}
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {isEditing ? (
                          <input
                            type="number"
                            name="amount"
                            step="0.01"
                            value={editValues.amount}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded-md w-32"
                          />
                        ) : (
                          formatCurrency(expense.amount)
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-right space-x-2">
                        {isEditing ? (
                          <>
                            <button
                              onClick={() => saveEdit(expense.id)}
                              className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100"
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="inline-flex items-center px-2 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </>
                        ) : (
                          <>
                             <button
                              onClick={() => startEdit(expense)}
                              className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md 
                                 hover:bg-blue-600 transition-colors mr-25"
                                  >
                                  Edit
                                 </button>
                    
                            <button
                              onClick={() => handleDelete(expense.id)}
                              className="inline-flex items-center px-2 py-1 rounded-md text-red-500 hover:text-red-700 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
