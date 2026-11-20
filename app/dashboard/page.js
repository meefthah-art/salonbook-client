"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/components/Providers";
import Spinner from "@/components/Spinner";
import { dashboardPath } from "@/lib/constants";

export default function DashboardRedirect() {
  const { user } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace(dashboardPath(user.role));
  }, [user]);

  return <Spinner text="Opening your dashboard" />;
}
