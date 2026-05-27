import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";
import ProtectedRoute from "../components/common/protectedRoute";
import DashboardLayout from "../layouts/dashboardLayout";
import RoleRoute from "../components/common/roleRoute";

import UserPage from "../pages/users/userPage";
import BarberPage from "../pages/barbers/barberPage";
import ServicesPage from "../pages/services/servicePage";
import AppointmentPage from "../pages/appointments/appointmentPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />}/> 
          <Route path="/users" element={
            <RoleRoute allowedRoles={['ADMIN']}>
              <UserPage />
            </RoleRoute>
          }/>
          <Route path="/barbers" element={
            <RoleRoute allowedRoles={['ADMIN']}>
              <BarberPage />
            </RoleRoute>
          }/>
          <Route path="/services" element={
            <RoleRoute allowedRoles={['ADMIN']}>
              <ServicesPage />
            </RoleRoute>
          }/>
          <Route path="/appointments" element={
            <RoleRoute allowedRoles={['ADMIN']}>
              <AppointmentPage />
            </RoleRoute>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
