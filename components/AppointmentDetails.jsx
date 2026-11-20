import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import SafeImg from "./SafeImg";
import { formatDate } from "@/lib/constants";

export default function AppointmentDetails({ appointment, onClose, showCustomer = false }) {
  if (!appointment) return null;
  const { service, customer } = appointment;

  const rows = [
    ["Date", appointment.appointmentDate],
    ["Time", appointment.timeSlot],
    ["Price", `$${appointment.servicePrice}`],
    ["Requested on", formatDate(appointment.createdAt)],
  ];

  return (
    <Modal open={!!appointment} onClose={onClose} title="Appointment details">
      <div className="flex items-center gap-4">
        <SafeImg src={service?.image} alt="" className="h-16 w-20 rounded-lg object-cover" />
        <div>
          <p className="text-xl font-heading font-semibold">{service ? service.serviceName : "Deleted service"}</p>
          <p className="text-sm text-base-content/65">{service?.category}</p>
        </div>
      </div>
      <dl className="mt-5 space-y-2 text-sm">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 border-b border-base-300 pb-2">
            <dt className="text-base-content/65">{label}</dt>
            <dd className="font-medium">{value}</dd>
          </div>
        ))}
        <div className="flex items-center justify-between gap-4 border-b border-base-300 pb-2">
          <dt className="text-base-content/65">Status</dt>
          <dd><StatusBadge value={appointment.status} /></dd>
        </div>
        <div className="flex items-center justify-between gap-4 border-b border-base-300 pb-2">
          <dt className="text-base-content/65">Payment</dt>
          <dd><StatusBadge value={appointment.paymentStatus} /></dd>
        </div>
        {showCustomer && customer && (
          <div className="flex justify-between gap-4 border-b border-base-300 pb-2">
            <dt className="text-base-content/65">Customer</dt>
            <dd className="text-right font-medium">{customer.name}<br /><span className="text-xs font-normal">{customer.email}{customer.phone ? ` | ${customer.phone}` : ""}</span></dd>
          </div>
        )}
      </dl>
      <div className="mt-4">
        <p className="text-sm text-base-content/65">Message</p>
        <p className="mt-1 rounded-lg bg-base-200 p-3 text-sm">{appointment.message || "No message was added."}</p>
      </div>
    </Modal>
  );
}
