"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiList, FiClock, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { toast } from "sonner";
import StatCard from "@/components/StatCard";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

export default function CustomerOverview() {
  const { user, tokenReady } = useApp();
  const [stats, setStats] = useState();

  useEffect(() => {
    if (!tokenReady) return;
    api("/appointments/my/stats").then(setStats).catch((err) => toast.error(err.message));
  }, [tokenReady]);

  return (
    <div>
      <h1 className="page-title">Hello, {user.name.split(" ")[0]}</h1>
      <p className="mt-2 text-base-content/70">Here is a quick look at your appointment requests.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Appointment Requests" value={stats?.total} icon={FiList} />
        <StatCard label="Pending Appointments" value={stats?.pending} icon={FiClock} />
        <StatCard label="Confirmed Appointments" value={stats?.confirmed} icon={FiCheckCircle} />
        <StatCard label="Cancelled Appointments" value={stats?.cancelled} icon={FiXCircle} />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/dashboard/customer/appointments" className="btn btn-primary">View My Appointments</Link>
        <Link href="/services" className="btn btn-outline">Book a New Service</Link>
      </div>
    </div>
  );
}
