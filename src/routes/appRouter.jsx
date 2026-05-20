import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "../components/common/protectedRoute";
import DashboardLayout from "../layouts/dashboardLayout";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
          <Route path="/dashboard"
            element={<Dashboard />}/>   
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;