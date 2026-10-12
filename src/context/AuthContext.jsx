
import { createContext, useContext, useEffect, useState } from "react";
import bcrypt from "bcryptjs";

const AuthContext = createContext(null);

const USERS_KEY = "fms_users";
const SESSION_KEY = "fms_session";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
    } catch {
      return null;
    }
  });

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const register = async ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();

    if (users.some((item) => item.email === normalizedEmail)) {
      throw new Error("An account with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash,
    };

    localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));

    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return sessionUser;
  };

  const login = async ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const account = getUsers().find(
      (item) => item.email === normalizedEmail
    );

    if (!account || !(await bcrypt.compare(password, account.passwordHash))) {
      throw new Error("Invalid email or password.");
    }

    const sessionUser = {
      id: account.id,
      name: account.name,
      email: account.email,
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return sessionUser;
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
