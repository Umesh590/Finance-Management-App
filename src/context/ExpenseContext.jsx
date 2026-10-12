import { createContext, useContext, useEffect, useReducer } from "react";
import { useAuth } from "./AuthContext";

const ExpenseContext = createContext(undefined);

const initialState = {
  expenses: [],
  loading: false,
  error: null,
  loadedKey: null,
};

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
      };

    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload.id,
        ),
      };

    case "UPDATE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense,
        ),
      };

    case "SET_EXPENSES":
      return {
        ...state,
        expenses: action.payload,
        loadedKey: action.storageKey,
        error: null,
      };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const { user } = useAuth();

  const [state, dispatch] = useReducer(expenseReducer, initialState);

  const userId = user?.id ?? user?._id ?? user?.email ?? null;

  const storageKey = userId ? `expenses_${String(userId).toLowerCase()}` : null;

  // Load saved data before allowing writes.
  useEffect(() => {
    if (!storageKey) {
      dispatch({
        type: "SET_EXPENSES",
        payload: [],
        storageKey: null,
      });
      return;
    }

    try {
      const saved = localStorage.getItem(storageKey);
      const expenses = saved ? JSON.parse(saved) : [];

      if (!Array.isArray(expenses)) {
        throw new Error("Saved expenses must be an array.");
      }

      dispatch({
        type: "SET_EXPENSES",
        payload: expenses,
        storageKey,
      });
    } catch (error) {
      console.error("Could not load expenses:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Could not load saved expenses.",
      });
    }
  }, [storageKey]);

  // Save only after the correct account's data has loaded.
  useEffect(() => {
    if (!storageKey || state.loadedKey !== storageKey) {
      return;
    }

    try {
      localStorage.setItem(storageKey, JSON.stringify(state.expenses));
    } catch (error) {
      console.error("Could not save expenses:", error);
      dispatch({
        type: "SET_ERROR",
        payload: "Could not save expenses.",
      });
    }
  }, [state.expenses, state.loadedKey, storageKey]);

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: newExpense,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: { id },
    });
  };

  const updateExpense = (expense) => {
    dispatch({
      type: "UPDATE_EXPENSE",
      payload: expense,
    });
  };

  const value = {
    expenses: state.expenses,
    loading: state.loading,
    error: state.error,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);

  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }

  return context;
};
