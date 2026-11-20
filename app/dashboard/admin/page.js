"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiUsers, FiScissors, FiList, FiClock, FiCheckCircle, FiDollarSign } from "react-icons/fi";
import StatCard from "@/components/StatCard";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

export default function AdminOverview() {
  const { tokenReady } = useApp();
  const [stats, setStats] = useState();

  useEffect(() => {
    if (!tokenReady) return;
    api("/admin/stats").then(setStats).catch((err) => toast.error(err.message));
  }, [tokenReady]);

  return (
    <div>
      <h1 className="page-title">Admin Overview</h1>
      <p className="mt-2 text-base-content/70">A summary of the salon at a glance.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard label="Total Registered Customers" value={stats?.totalCustomers} icon={FiUsers} />
        <StatCard label="Total Active Services" value={stats?.activeServices} icon={FiScissors} />
        <StatCard label="Total Appointment Requests" value={stats?.totalAppointments} icon={FiList} />
        <StatCard label="Pending Appointments" value={stats?.pendingAppointments} icon={FiClock} />
        <StatCard label="Confirmed Appointments" value={stats?.confirmedAppointments} icon={FiCheckCircle} />
        <StatCard label="Total Successful Payments" value={stats?.successfulPayments} icon={FiDollarSign} />
      </div>
    </div>
  );
}
