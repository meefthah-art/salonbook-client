"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FiClock, FiAlertCircle } from "react-icons/fi";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import EmptyState from "@/components/EmptyState";
import SafeImg from "@/components/SafeImg";
import AppointmentForm from "@/components/AppointmentForm";
import { useApp } from "@/components/Providers";
import { api } from "@/lib/api";

function ServiceDetails() {
  const { id } = useParams();
  const { user, tokenReady } = useApp();
  const [service, setService] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!tokenReady) return;
    api(`/services/${id}`).then(setService).catch((err) => setError(err.message));
  }, [id, tokenReady]);

  if (error) {
    return (
      <div className="container-x py-16">
        <EmptyState icon={FiAlertCircle} title="Service unavailable" text={error} actionLabel="Browse services" actionHref="/services" />
      </div>
    );
  }
  if (!service) return <Spinner text="Loading service" />;

  return (
    <div className="container-x py-10">
      <p className="mb-6 text-sm text-base-content/60">
        <Link href="/services" className="hover:text-primary">Services</Link> / {service.serviceName}
      </p>
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SafeImg src={service.image} alt={service.serviceName} className="h-72 w-full rounded-box object-cover sm:h-[420px]" />
          <span className="badge badge-secondary mt-5">{service.category}</span>
          <h1 className="page-title mt-3">{service.serviceName}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-5">
            <span className="text-2xl font-bold text-primary">${service.price}</span>
            <span className="flex items-center gap-2 text-base-content/70"><FiClock className="h-4 w-4" />About {service.duration} minutes</span>
          </div>
          <h2 className="mt-8 text-2xl">About this service</h2>
          <p className="mt-2 whitespace-pre-line leading-relaxed text-base-content/75">{service.description}</p>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-box border border-base-300 bg-base-100 p-6">
            <h2 className="text-2xl">Book an appointment</h2>
            {user.role === "admin" ? (
              <p className="mt-3 rounded-lg bg-base-200 p-4 text-sm text-base-content/70">
                Admins cannot submit appointment requests. Sign in with a customer account to book.
              </p>
            ) : service.status !== "active" ? (
              <p className="mt-3 rounded-lg bg-base-200 p-4 text-sm text-base-content/70">This service is not available for booking.</p>
            ) : (
              <div className="mt-4"><AppointmentForm serviceId={String(service._id)} /></div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function Page() {
  return <PrivateRoute><ServiceDetails /></PrivateRoute>;
}
