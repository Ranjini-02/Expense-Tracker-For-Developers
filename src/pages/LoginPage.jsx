import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSessionUser, loginUser } from "../lib/auth";

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (getSessionUser()) {
      navigate("/dashboard", { replace: true });
      return;
    }

    try {
      setIsSubmitting(true);
      loginUser(form);
      const redirectTo = typeof location.state?.from === "string" ? location.state.from : "/dashboard";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-wrap">
      <section className="card auth-card">
        <h1>Login</h1>
        <p className="subtitle">Welcome back. Continue tracking your expenses.</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input name="email" value={form.email} onChange={onChange} type="email" required />
          </label>
          <label>
            Password
            <input
              name="password"
              value={form.password}
              onChange={onChange}
              type="password"
              minLength="6"
              required
            />
          </label>
          {error ? <p className="error">{error}</p> : null}
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Login"}
          </button>
        </form>
        <p className="helper-text">
          New user? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
