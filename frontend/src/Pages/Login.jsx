import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";
import { LoaderIcon } from "lucide-react";

export default function Login() {
  const { login } = useContext(AuthContext); // uses your existing context
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple client-side validation
    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);
    try {
      await login(form); // your AuthContext.login should set token & user
      toast.success("Logged in successfully!");
      nav("/"); // redirect to home
    } catch (err) {
      // surface server error via toast and local error text for UI
      const msg = err?.response?.data?.error || err?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-2">Welcome back</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Log in to access your private notes.
              </p>

              <form onSubmit={onSubmit} className="space-y-4">
                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Your password"
                    className="input input-bordered w-full"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>

                {/* Error display */}
                {error && (
                  <div className="text-sm text-red-600 mt-1">{error}</div>
                )}

                {/* Actions */}
                <div className="card-actions justify-between items-center mt-2">
                 

                  <button
                    type="submit"
                    className={`btn bg-blue-600 hover:bg-blue-700 text-white w-full font-semibold py-2 px-6 rounded-lg shadow-md flex items-center justify-center gap-2 transition-colors duration-200 ${
                      loading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderIcon className="animate-spin h-4 w-4" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>

                   <div>
                    <Link
                      to="/register"
                      className="text-sm text-primary hover:underline"
                    >
                      Don’t have an account? Register
                    </Link>
                  </div>
                </div>
              </form>

              {/* small footer / help */}
              <div className="mt-4 text-xs text-muted-foreground">
                By logging in you accept the app terms. If you have issues,
                contact the admin cst21087@std.uwu.ac.lk
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
