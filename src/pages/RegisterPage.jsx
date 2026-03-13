import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSessionUser, registerUser } from "../lib/auth";

function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      registerUser(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="page-wrap">
      <section className="card auth-card">
        <h1>Register</h1>
        <p className="subtitle">Create your developer expense account.</p>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" value={form.name} onChange={onChange} type="text" required />
          </label>
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
            {isSubmitting ? "Creating..." : "Register"}
          </button>
        </form>
        <p className="helper-text">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
