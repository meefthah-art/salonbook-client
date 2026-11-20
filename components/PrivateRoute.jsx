"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useApp } from "./Providers";
import Spinner from "./Spinner";
import { dashboardPath } from "@/lib/constants";

export default function PrivateRoute({ children, role }) {
  const { user, loading, tokenReady, logout } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const wrongRole = user && role && user.role !== role;

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace(`/signin?redirect=${encodeURIComponent(pathname)}`);
    } else if (wrongRole && !user.isBlocked) {
      toast.error("You do not have access to that page.");
      router.replace(dashboardPath(user.role));
    }
  }, [loading, user, wrongRole]);

  if (loading || !user || !tokenReady) return <Spinner />;

  if (user.isBlocked) {
    return (
      <div className="container-x py-20 text-center">
        <h2 className="text-3xl">Your account is blocked</h2>
        <p className="mx-auto mt-3 max-w-md text-base-content/70">
          You cannot use this part of SalonBook right now. Please contact the salon if you think this is a mistake.
        </p>
        <button className="btn btn-primary mt-6" onClick={logout}>Sign out</button>
      </div>
    );
  }

  if (wrongRole) return <Spinner />;
  return children;
}
