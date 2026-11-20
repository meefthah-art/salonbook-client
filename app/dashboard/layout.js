"use client";
import PrivateRoute from "@/components/PrivateRoute";
import DashboardShell from "@/components/DashboardShell";

export default function DashboardLayout({ children }) {
  return (
    <PrivateRoute>
      <DashboardShell>{children}</DashboardShell>
    </PrivateRoute>
  );
}
