"use client";
import PrivateRoute from "@/components/PrivateRoute";

export default function AdminLayout({ children }) {
  return <PrivateRoute role="admin">{children}</PrivateRoute>;
}
