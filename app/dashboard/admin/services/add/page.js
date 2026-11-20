"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceForm from "@/components/ServiceForm";
import { api } from "@/lib/api";

export default function AddService() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const save = async (data) => {
    setBusy(true);
    try {
      await api("/admin/services", { method: "POST", body: data });
      toast.success("Service added.");
      router.push("/dashboard/admin/services");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Add Service</h1>
      <p className="mb-6 mt-2 text-base-content/70">New services are active by default.</p>
      <ServiceForm onSubmit={save} busy={busy} buttonText="Add Service" />
    </div>
  );
}
