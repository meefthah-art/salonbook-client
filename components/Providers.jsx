"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

export default function Providers({ children }) {
  const { data: session, isPending, refetch } = authClient.useSession();
  const [tokenReady, setTokenReady] = useState(false);
  const user = session?.user || null;
  const userId = user?.id;

  // after sign in (and after every page reload) make sure the API cookie exists too
  useEffect(() => {
    if (isPending) return;
    if (!userId) {
      setTokenReady(true);
      return;
    }
    let stopped = false;
    setTokenReady(false);
    fetch("/api/session-token", { method: "POST" })
      .catch(() => {})
      .finally(() => {
        if (!stopped) setTokenReady(true);
      });
    return () => {
      stopped = true;
    };
  }, [userId, isPending]);

  const logout = async () => {
    await fetch("/api/session-token", { method: "DELETE" }).catch(() => {});
    await authClient.signOut();
  };

  return (
    <AppContext.Provider value={{ user, loading: isPending, tokenReady, logout, refreshUser: refetch }}>
      {children}
      <Toaster richColors closeButton position="top-right" />
    </AppContext.Provider>
  );
}
