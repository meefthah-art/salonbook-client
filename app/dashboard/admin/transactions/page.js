"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiCreditCard } from "react-icons/fi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/constants";
import { useApp } from "@/components/Providers";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";

export default function Transactions() {
  const { tokenReady } = useApp();
  const [list, setList] = useState(null);

  useEffect(() => {
    if (!tokenReady) return;
    api("/admin/transactions")
      .then(setList)
      .catch((err) => {
        toast.error(err.message);
        setList([]);
      });
  }, [tokenReady]);

  return (
    <div>
      <h1 className="page-title">Transactions</h1>
      <p className="mt-2 text-base-content/70">Payments are recorded by Stripe and cannot be edited here.</p>

      <div className="mt-6">
        {list === null ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : list.length === 0 ? (
          <EmptyState icon={FiCreditCard} title="No transactions yet" text="Payments will show up here after customers pay for confirmed appointments." />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead><tr><th>Customer</th><th>Service</th><th>Appointment</th><th>Amount</th><th>Currency</th><th>Stripe session</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {list.map((t) => (
                  <tr key={t._id}>
                    <td className="min-w-[160px]"><p className="font-semibold">{t.customer ? t.customer.name : "Unknown"}</p><p className="text-xs text-base-content/60">{t.customer?.email}</p></td>
                    <td className="min-w-[140px]">{t.serviceName}</td>
                    <td className="whitespace-nowrap text-sm">{t.appointmentDate}<br />{t.timeSlot}</td>
                    <td className="font-semibold">{t.amount}</td>
                    <td className="uppercase">{t.currency}</td>
                    <td className="font-mono text-xs">...{t.stripeSessionId.slice(-12)}</td>
                    <td><StatusBadge value={t.status} /></td>
                    <td className="whitespace-nowrap text-sm">{formatDate(t.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
