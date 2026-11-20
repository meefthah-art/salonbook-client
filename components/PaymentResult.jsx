"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiCheckCircle, FiClock, FiAlertCircle } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApp } from "./Providers";

export default function PaymentResult() {
  const params = useSearchParams();
  const sessionId = params.get("session_id");
  const { tokenReady } = useApp();
  const [status, setStatus] = useState("processing");

  // the webhook can take a few seconds, so we check a few times
  useEffect(() => {
    if (!tokenReady || !sessionId) return;
    let tries = 0;
    let timer;
    const check = async () => {
      tries += 1;
      try {
        const data = await api(`/payments/status?session_id=${encodeURIComponent(sessionId)}`);
        if (data.status !== "processing") return setStatus(data.status);
      } catch (err) {}
      if (tries < 10) timer = setTimeout(check, 2000);
      else setStatus("slow");
    };
    check();
    return () => clearTimeout(timer);
  }, [tokenReady, sessionId]);

  let icon = <FiClock className="h-12 w-12 text-warning" />;
  let title = "Confirming your payment";
  let text = "Please wait a moment while we receive the confirmation from Stripe.";

  if (!sessionId) {
    icon = <FiAlertCircle className="h-12 w-12 text-error" />;
    title = "No payment found";
    text = "We could not find a payment session in this link.";
  } else if (status === "paid") {
    icon = <FiCheckCircle className="h-12 w-12 text-success" />;
    title = "Payment successful";
    text = "Thank you! Your payment is confirmed and your appointment is all set.";
  } else if (status === "failed") {
    icon = <FiAlertCircle className="h-12 w-12 text-error" />;
    title = "Payment failed";
    text = "Your payment did not go through. You can try again from My Appointments.";
  } else if (status === "slow") {
    title = "Still waiting for confirmation";
    text = "Your payment may still be processing. Check My Appointments in a minute to see the latest status.";
  }

  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-base-200">
          {status === "processing" && sessionId ? <span className="loading loading-spinner loading-lg text-primary" /> : icon}
        </div>
        <h1 className="mt-5 text-4xl">{title}</h1>
        <p className="mt-3 text-base-content/70">{text}</p>
        <Link href="/dashboard/customer/appointments" className="btn btn-primary mt-6">Go to My Appointments</Link>
      </div>
    </section>
  );
}
