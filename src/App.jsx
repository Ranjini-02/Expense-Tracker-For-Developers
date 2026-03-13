import React from "react";
import { BrowserRouter, HashRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import ContentPage from "./pages/ContentPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { getSessionUser, logout } from "./lib/auth";

function App() {
  const sessionUser = getSessionUser();
  const Router = import.meta.env.PROD ? HashRouter : BrowserRouter;

  return (
    <Router>
      <div className="site-shell">
        <header className="topbar">
          <Link className="brand" to="/">
            DevExpense
          </Link>
          <nav className="topnav">
            <Link to="/">Landing</Link>
            {sessionUser ? (
              <>
                <span className="nav-user" title={sessionUser.email}>
                  Hi, {sessionUser.name}
                </span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/content">Content</Link>
                <Link
                  to="/"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
              </>
            )}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/content"
            element={
              <ProtectedRoute>
                <ContentPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
