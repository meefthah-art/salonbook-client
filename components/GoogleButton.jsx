"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function GoogleButton({ callbackURL = "/dashboard" }) {
  const [busy, setBusy] = useState(false);

  const signInWithGoogle = async () => {
    setBusy(true);
    try {
      await authClient.signIn.social({ provider: "google", callbackURL });
    } catch (err) {
      toast.error("Google sign in failed. Please try again.");
      setBusy(false);
    }
  };

  return (
    <button type="button" onClick={signInWithGoogle} disabled={busy} className="btn btn-outline btn-block gap-3">
      {busy ? <span className="loading loading-spinner loading-sm" /> : <FcGoogle className="h-5 w-5" />}
      Continue with Google
    </button>
  );
}
