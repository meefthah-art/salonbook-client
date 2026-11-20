"use client";
import PrivateRoute from "@/components/PrivateRoute";

export default function CustomerLayout({ children }) {
  return <PrivateRoute role="customer">{children}</PrivateRoute>;
}
