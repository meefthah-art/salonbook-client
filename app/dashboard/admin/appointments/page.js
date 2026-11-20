"use client";
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

export default function ManageAppointments() {
  const { tokenReady } = useApp();
  const [list, setList] = useState(null);
  const [filter, setFilter] = useState("");
  const [viewing, setViewing] = useState(null);
  const [cancelling, setCancelling] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    setList(null);
    api(`/admin/appointments${filter ? `?status=${filter}` : ""}`)
      .then(setList)
      .catch((err) => {
        toast.error(err.message);
        setList([]);
      });
  };

  useEffect(() => {
    if (tokenReady) load();
  }, [tokenReady, filter]);

  const confirmAppointment = async (appointment) => {
    try {
      await api(`/admin/appointments/${appointment._id}/confirm`, { method: "PATCH" });
      toast.success("Appointment confirmed.");
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const cancelAppointment = async () => {
    setBusy(true);
    try {
      await api(`/admin/appointments/${cancelling._id}/cancel`, { method: "PATCH" });
      toast.success("Appointment cancelled.");
      setCancelling(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setCancelling(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title">Manage Appointments</h1>
          <p className="mt-2 text-base-content/70">Confirm or cancel the appointment requests from customers.</p>
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
          <EmptyState icon={FiCalendar} title="No appointments found" text="Appointment requests from customers will appear here." />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead><tr><th>Customer</th><th>Service</th><th>Date and time</th><th>Price</th><th>Status</th><th>Payment</th><th>Requested</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {list.map((a) => (
                  <tr key={a._id}>
                    <td className="min-w-[160px]"><p className="font-semibold">{a.customer ? a.customer.name : "Unknown"}</p><p className="text-xs text-base-content/60">{a.customer?.email}</p></td>
                    <td className="min-w-[140px]">{a.service ? a.service.serviceName : "Deleted service"}</td>
                    <td className="whitespace-nowrap text-sm">{a.appointmentDate}<br />{a.timeSlot}</td>
                    <td className="font-semibold">${a.servicePrice}</td>
                    <td><StatusBadge value={a.status} /></td>
                    <td><StatusBadge value={a.paymentStatus} /></td>
                    <td className="whitespace-nowrap text-sm">{formatDate(a.createdAt)}</td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => setViewing(a)}>View</button>
                        {a.status === "pending" && <button className="btn btn-success btn-sm" onClick={() => confirmAppointment(a)}>Confirm</button>}
                        {a.status !== "cancelled" && <button className="btn btn-error btn-outline btn-sm" onClick={() => setCancelling(a)}>Cancel</button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AppointmentDetails appointment={viewing} onClose={() => setViewing(null)} showCustomer />
      <ConfirmModal open={!!cancelling} onClose={() => setCancelling(null)} onConfirm={cancelAppointment} loading={busy} danger
        confirmText="Cancel appointment" title="Cancel this appointment?"
        message="The customer will see this appointment as cancelled. Any payment already made is not refunded automatically." />
    </div>
  );
}
