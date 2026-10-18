import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Wallet,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  ChartNoAxesCombined,
} from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login({ email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d1b] px-4 py-10 text-white">
      {/* Background effects */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

      <div className="relative z-10 grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-[#101729]/90 shadow-2xl shadow-black/40 lg:grid-cols-2">
        {/* Left: Branding panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-700 p-10 lg:flex xl:p-12">
          <div className="absolute -right-20 top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -right-10 top-34 h-44 w-44 rounded-full border border-white/10" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

          <div className="relative z-10 flex items-center gap-3">
            <div className="rounded-xl bg-white/15 p-3 backdrop-blur-md">
              <Wallet size={27} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              Finora<span className="text-cyan-200">.</span>
            </span>
          </div>

          <div className="relative z-10 my-12">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white/90">
              <TrendingUp size={16} />
              Your money, under control
            </span>

            <h1 className="max-w-md text-4xl font-bold leading-tight xl:text-5xl">
              Make smarter moves with your money.
            </h1>

            <p className="mt-5 max-w-sm text-base leading-7 text-indigo-100">
              Track expenses, understand your spending habits, and build a
              healthier financial future—all in one place.
            </p>

            {/* Finance summary illustration */}
            <div className="mt-10 rounded-2xl border border-white/20 bg-white/10 p-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-indigo-100">Your finances</p>
                  <p className="mt-1 text-2xl font-bold">Stay on track</p>
                </div>
                <div className="rounded-xl bg-emerald-400/20 p-3 text-emerald-200">
                  <ChartNoAxesCombined size={25} />
                </div>
              </div>

              <div className="mt-6 flex h-20 items-end gap-2">
                {[35, 52, 40, 70, 55, 82, 64, 95, 72, 100, 78, 90].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-white/80 transition-all duration-300 hover:bg-cyan-200"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-indigo-100">
                <ShieldCheck size={16} />
                Simple, secure expense management
              </div>
            </div>
          </div>

          <p className="relative z-10 text-sm text-indigo-100/80">
            Take charge of today. Plan for tomorrow.
          </p>
        </div>

        {/* Right: Login form */}
        <div className="flex items-center justify-center p-7 sm:p-10 lg:p-12 xl:p-14">
          <div className="w-full max-w-md">
            {/* Mobile branding */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-3 lg:hidden"
            >
              <div className="rounded-xl bg-violet-500/20 p-3 text-violet-300">
                <Wallet size={25} />
              </div>
              <span className="text-2xl font-bold">
                Finora<span className="text-violet-400">.</span>
              </span>
            </Link>

            <div className="mb-9">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-violet-400">
                Welcome back
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Sign in to your account
              </h2>

              <p className="mt-3 leading-6 text-slate-400">
                Enter your details to continue managing your finances.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-200"
                >
                  Email address
                </label>

                <div className="group relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
                  />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1120] py-3.5 pl-12 pr-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-200"
                  >
                    Password
                  </label>
                </div>

                <div className="group relative">
                  <LockKeyhole
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-violet-400"
                  />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0b1120] py-3.5 pl-12 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-3.5 font-semibold text-white shadow-lg shadow-violet-900/25 transition duration-300 hover:-translate-y-0.5 hover:from-violet-500 hover:to-indigo-500 hover:shadow-violet-900/40 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
                {!loading && (
                  <ArrowRight
                    size={19}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-xs text-slate-500">NEW TO FINORA?</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <p className="text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-violet-400 transition hover:text-violet-300"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
              <ShieldCheck size={15} />
              Your financial journey starts here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
