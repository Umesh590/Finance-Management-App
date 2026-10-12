import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await register(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen bg-[#f3f5fa] flex items-center justify-center p-4 sm:p-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl shadow-slate-300/50 lg:grid-cols-2">
        {/* Left Branding Panel */}
        <section className="relative hidden flex-col justify-between overflow-hidden bg-[#111827] p-10 text-white lg:flex xl:p-12">
          <div className="absolute -right-24 -top-20 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 17l6-6 4 4 8-9M15 6h6v6"
                />
              </svg>
            </div>

            <span className="text-xl font-bold tracking-tight">FinTrack</span>
          </div>

          <div className="relative z-10 my-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-indigo-200">
              <span className="h-2 w-2 rounded-full bg-indigo-400" />
              YOUR MONEY, YOUR CONTROL
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight xl:text-5xl">
              Make smarter
              <br />
              financial
              <br />
              <span className="text-indigo-400">decisions.</span>
            </h1>

            <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
              Keep track of your expenses, understand your spending habits, and
              take control of your financial future — all in one place.
            </p>

            {/* Decorative chart */}
            <div className="mt-9 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400">
                    Your financial journey
                  </p>
                  <p className="mt-1 text-lg font-semibold">Starts here</p>
                </div>

                <div className="rounded-lg bg-emerald-400/10 px-3 py-2 text-xs font-semibold text-emerald-400">
                  + Better habits
                </div>
              </div>

              <div className="mt-6 flex h-20 items-end gap-3">
                {[35, 55, 42, 72, 50, 85, 65, 100, 78, 90, 70, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-t-md ${
                        index === 7 ? "bg-indigo-400" : "bg-indigo-400/25"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          <p className="relative z-10 text-xs text-gray-500">
            © {new Date().getFullYear()} FinTrack. Built for better money
            habits.
          </p>
        </section>

        {/* Right Registration Form */}
        <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
          <div className="w-full max-w-md">
            {/* Mobile Brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 17l6-6 4 4 8-9M15 6h6v6"
                  />
                </svg>
              </div>

              <span className="text-xl font-bold text-gray-900">FinTrack</span>
            </div>

            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
                Get started — it's free
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                Create account
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Enter your details below to create your account.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="name"
                  placeholder="e.g. Umesh Kumar"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="At least 8 characters"
                  minLength={8}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className={labelClass}>
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-700 hover:shadow-indigo-600/30 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}

                {!loading && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7-7 7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs text-gray-400">ALREADY REGISTERED?</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="text-center text-sm text-gray-600">
              Have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 transition hover:text-indigo-800"
              >
                Sign in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-gray-400">
              By creating an account, you can start organizing your finances in
              one place.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
