import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminRoute from "./components/AdminRoute";
import UserRoute from "./components/UserRoute";

export default function App() {
  return (
    <div className="App">
      <UserProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/adminDashboard"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/userDashboard"
              element={
                <UserRoute>
                  <UserDashboard />
                </UserRoute>
              }
            />
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
}
