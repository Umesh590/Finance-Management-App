// Format amount as Indian Rupees (INR)
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);
};

// Format date for display
export const formatDate = (dateString) => {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Calculate total expenses
export const getTotalExpenses = (expenses = []) => {
  return expenses.reduce(
    (total, expense) => total + (Number(expense.amount) || 0),
    0,
  );
};

// Normalize category names to a consistent format
export const normalizeCategory = (category) => {
  const value = String(category || "other")
    .trim()
    .toLowerCase();

  const categoryMap = {
    "food & dining": "food",
    transportation: "transport",
    "health & medical": "health",
  };

  return categoryMap[value] || value;
};

// Calculate expenses grouped by category
export const getExpensesByCategory = (expenses = []) => {
  const categories = {
    food: 0,
    transport: 0,
    entertainment: 0,
    shopping: 0,
    utilities: 0,
    other: 0,
    health: 0,
  };

  expenses.forEach((expense) => {
    const category = normalizeCategory(expense.category);
    const amount = Number(expense.amount) || 0;

    if (Object.prototype.hasOwnProperty.call(categories, category)) {
      categories[category] += amount;
    } else {
      categories.other += amount;
    }
  });

  return categories;
};

// Prepare category data for the pie chart
export const getChartData = (expenses = []) => {
  const expensesByCategory = getExpensesByCategory(expenses);

  return Object.entries(expensesByCategory)
    .filter(([, value]) => value > 0)
    .map(([name, value]) => ({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      value,
    }));
};

// Get text color for each category
export const getCategoryTextColor = (category) => {
  const colors = {
    food: "text-indigo-500",
    transport: "text-cyan-500",
    entertainment: "text-purple-500",
    utilities: "text-teal-500",
    health: "text-green-500",
    shopping: "text-orange-500",
    other: "text-slate-500",
  };

  return colors[normalizeCategory(category)] || "text-gray-500";
};

// Get the month name from a date
export const getMonthName = (date) => {
  return date.toLocaleString("en-IN", { month: "long" });
};

// Calculate expenses for the most recent months
export const getExpensesByMonth = (expenses = [], numMonths = 6) => {
  const now = new Date();
  const result = {};

  for (let i = 0; i < numMonths; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);

    const monthYear = `${getMonthName(date)} ${date.getFullYear()}`;
    result[monthYear] = 0;
  }

  expenses.forEach((expense) => {
    const expenseDate = new Date(expense.date);

    if (Number.isNaN(expenseDate.getTime())) {
      return;
    }

    const monthYear = `${getMonthName(expenseDate)} ${expenseDate.getFullYear()}`;

    if (Object.prototype.hasOwnProperty.call(result, monthYear)) {
      result[monthYear] += Number(expense.amount) || 0;
    }
  });

  return result;
};
