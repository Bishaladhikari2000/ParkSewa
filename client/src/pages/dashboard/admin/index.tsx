import { Routes, Route } from "react-router-dom";
import { AdminDashboard } from "../AdminDashboard";
import { UserManagement } from "@/components/dashboard/UserManagement";
import { AdminSettings } from "@/components/dashboard/AdminSettings";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="settings" element={<AdminSettings />} />
    </Routes>
  );
};