import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/ProtectedRoute";
import { authClient } from "@/lib/auth-client";

const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();
  if (isPending) return null;
  if (session)
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  return <>{children}</>;
};

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginGuard>
              <LoginPage />
            </LoginGuard>
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
