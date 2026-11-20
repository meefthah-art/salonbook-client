"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ServiceForm from "@/components/ServiceForm";
import Spinner from "@/components/Spinner";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

export default function EditService() {
  const { id } = useParams();
  const router = useRouter();
  const { tokenReady } = useApp();
  const [service, setService] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!tokenReady) return;
    api(`/admin/services/${id}`)
      .then(setService)
      .catch((err) => {
        toast.error(err.message);
        router.replace("/dashboard/admin/services");
      });
  }, [id, tokenReady]);

  const save = async (data) => {
    setBusy(true);
    try {
      await api(`/admin/services/${id}`, { method: "PUT", body: data });
      toast.success("Service updated.");
      router.push("/dashboard/admin/services");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  if (!service) return <Spinner text="Loading service" />;

  return (
    <div>
      <h1 className="page-title">Update Service</h1>
      <p className="mb-6 mt-2 text-base-content/70">Change any detail and save.</p>
      <ServiceForm initial={service} onSubmit={save} busy={busy} buttonText="Save Changes" />
    </div>
  );
}
