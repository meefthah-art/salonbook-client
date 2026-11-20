"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { TIME_SLOTS } from "@/lib/constants";

const today = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

export default function AppointmentForm({ serviceId }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!date) return setError("Please choose a date.");
    if (!slot) return setError("Please choose a time slot.");

    setBusy(true);
    try {
      await api("/appointments", { method: "POST", body: { serviceId, appointmentDate: date, timeSlot: slot, message } });
      toast.success("Appointment request sent. We will confirm it soon.");
      router.push("/dashboard/customer/appointments");
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="date" className="mb-1 block text-sm font-medium">Appointment date</label>
        <input id="date" type="date" min={today()} value={date} onChange={(e) => setDate(e.target.value)} className="input-field" />
      </div>
      <div>
        <label htmlFor="slot" className="mb-1 block text-sm font-medium">Time slot</label>
        <select id="slot" value={slot} onChange={(e) => setSlot(e.target.value)} className="select select-bordered w-full bg-base-100">
          <option value="">Select a time</option>
          {TIME_SLOTS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">Message (optional)</label>
        <textarea id="message" rows={3} maxLength={300} value={message} onChange={(e) => setMessage(e.target.value)} className="textarea textarea-bordered w-full bg-base-100" placeholder="Anything the stylist should know?" />
      </div>
      {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
      <button className="btn btn-primary btn-block" disabled={busy}>
        {busy && <span className="loading loading-spinner loading-sm" />}
        Request Appointment
      </button>
    </form>
  );
}
