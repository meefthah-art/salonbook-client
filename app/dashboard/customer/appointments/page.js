"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCalendar } from "react-icons/fi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/constants";
import { useApp } from "@/components/Providers";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";
import ConfirmModal from "@/components/ConfirmModal";
import AppointmentDetails from "@/components/AppointmentDetails";
import SafeImg from "@/components/SafeImg";

export default function MyAppointments() {
  const { tokenReady } = useApp();
  const [list, setList] = useState(null);
  const [filter, setFilter] = useState("");
  const [viewing, setViewing] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [busy, setBusy] = useState(false);
  const [payingId, setPayingId] = useState("");

  const load = () => {
    setList(null);
    api(`/appointments/my${filter ? `?status=${filter}` : ""}`)
      .then(setList)
      .catch((err) => {
        toast.error(err.message);
        setList([]);
      });
  };

  useEffect(() => {
    if (tokenReady) load();
  }, [tokenReady, filter]);

  const cancelAppointment = async () => {
    setBusy(true);
    try {
      await api(`/appointments/${cancelling._id}/cancel`, { method: "PATCH" });
      toast.success("Appointment request cancelled.");
      setCancelling(null);
      load();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  const payNow = async (appointment) => {
    setPayingId(appointment._id);
    try {
      const data = await api("/payments/checkout", { method: "POST", body: { appointmentId: appointment._id } });
      window.location.href = data.url;
    } catch (err) {
      toast.error(err.message);
      setPayingId("");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title">My Appointments</h1>
          <p className="mt-2 text-base-content/70">Track your requests and pay for confirmed appointments.</p>
        </div>
        <select className="select select-bordered bg-base-100" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="mt-6">
        {list === null ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : list.length === 0 ? (
          <EmptyState icon={FiCalendar} title="No appointments here" text="When you request an appointment it will show up on this page." actionLabel="Browse services" actionHref="/services" />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr><th>Service</th><th>Date</th><th>Time</th><th>Price</th><th>Status</th><th>Payment</th><th>Requested</th><th className="text-right">Actions</th></tr>
              </thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a._id}>
                    <td>
                      <div className="flex min-w-[200px] items-center gap-3">
                        <SafeImg src={a.service?.image} alt="" className="h-12 w-16 rounded-md object-cover" />
                        <div>
                          <p className="font-semibold">{a.service ? a.service.serviceName : "Deleted service"}</p>
                          <p className="text-xs text-base-content/60">{a.service?.category}</p>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap">{a.appointmentDate}</td>
                    <td className="whitespace-nowrap">{a.timeSlot}</td>
                    <td className="font-semibold">${a.servicePrice}</td>
                    <td><StatusBadge value={a.status} /></td>
                    <td><StatusBadge value={a.paymentStatus} /></td>
                    <td className="whitespace-nowrap text-sm">{formatDate(a.createdAt)}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => setViewing(a)}>View</button>
                        {a.status === "pending" && <button className="btn btn-error btn-outline btn-sm" onClick={() => setCancelling(a)}>Cancel</button>}
                        {a.status === "confirmed" && a.paymentStatus === "unpaid" && (
                          <button className="btn btn-primary btn-sm" disabled={payingId === a._id} onClick={() => payNow(a)}>
                            {payingId === a._id && <span className="loading loading-spinner loading-xs" />}
                            Pay Now
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AppointmentDetails appointment={viewing} onClose={() => setViewing(null)} />
      <ConfirmModal open={!!cancelling} onClose={() => setCancelling(null)} onConfirm={cancelAppointment} loading={busy} danger
        confirmText="Cancel request" title="Cancel this request?"
        message="This pending appointment request will be cancelled. You can always send a new request later." />
    </div>
  );
}
