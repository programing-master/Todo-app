import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import TaskPage from "../pages/common/TaskPage";
import Layout from "../layouts/Layout";
import ProtectedRoutes from "../components/ProtectedRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<TaskPage />} />
            <Route path=":id" element={<TaskPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}