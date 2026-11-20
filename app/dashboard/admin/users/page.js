"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiUsers } from "react-icons/fi";
import { api } from "@/lib/api";
import { formatDate } from "@/lib/constants";
import { useApp } from "@/components/Providers";
import EmptyState from "@/components/EmptyState";
import ConfirmModal from "@/components/ConfirmModal";
import Modal from "@/components/Modal";
import SafeImg from "@/components/SafeImg";

export default function ManageUsers() {
  const { tokenReady } = useApp();
  const [list, setList] = useState(null);
  const [details, setDetails] = useState(null);
  const [target, setTarget] = useState(null);
  const [busy, setBusy] = useState(false);

  const load = () => {
    api("/admin/users")
      .then(setList)
      .catch((err) => {
        toast.error(err.message);
        setList([]);
      });
  };

  useEffect(() => {
    if (tokenReady) load();
  }, [tokenReady]);

  const viewUser = async (user) => {
    try {
      setDetails(await api(`/admin/users/${user._id}`));
    } catch (err) {
      toast.error(err.message);
    }
  };

  const changeBlock = async () => {
    setBusy(true);
    const action = target.isBlocked ? "unblock" : "block";
    try {
      await api(`/admin/users/${target._id}/${action}`, { method: "PATCH" });
      toast.success(`User ${action}ed.`);
      setTarget(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setTarget(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Manage Users</h1>
      <p className="mt-2 text-base-content/70">Blocked customers cannot use any protected feature.</p>

      <div className="mt-6">
        {list === null ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : list.length === 0 ? (
          <EmptyState icon={FiUsers} title="No customers yet" text="Customers will be listed here after they sign up." />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead><tr><th>Customer</th><th>Phone</th><th>Joined</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {list.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <div className="flex min-w-[200px] items-center gap-3">
                        {u.image ? <SafeImg src={u.image} alt="" className="h-10 w-10 rounded-full object-cover" /> : <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-bold text-primary-content">{u.name?.[0]?.toUpperCase()}</span>}
                        <div><p className="font-semibold">{u.name}</p><p className="text-xs text-base-content/60">{u.email}</p></div>
                      </div>
                    </td>
                    <td>{u.phone || "-"}</td>
                    <td className="whitespace-nowrap text-sm">{u.createdAt ? formatDate(u.createdAt) : "-"}</td>
                    <td><span className={`badge ${u.isBlocked ? "badge-error" : "badge-success"}`}>{u.isBlocked ? "Blocked" : "Active"}</span></td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => viewUser(u)}>View</button>
                        <button className={`btn btn-sm ${u.isBlocked ? "btn-success" : "btn-error btn-outline"}`} onClick={() => setTarget(u)}>{u.isBlocked ? "Unblock" : "Block"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={!!details} onClose={() => setDetails(null)} title="Customer details">
        {details && (
          <dl className="space-y-2 text-sm">
            {[
              ["Name", details.name],
              ["Email", details.email],
              ["Phone", details.phone || "Not added"],
              ["Joined", details.createdAt ? formatDate(details.createdAt) : "-"],
              ["Account", details.isBlocked ? "Blocked" : "Active"],
              ["Total appointments", details.totalAppointments],
              ["Paid appointments", details.paidAppointments],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-base-300 pb-2">
                <dt className="text-base-content/65">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

      <ConfirmModal open={!!target} onClose={() => setTarget(null)} onConfirm={changeBlock} loading={busy} danger={!target?.isBlocked}
        confirmText={target?.isBlocked ? "Unblock user" : "Block user"} title={target?.isBlocked ? "Unblock this user?" : "Block this user?"}
        message={target?.isBlocked ? `${target?.name} will be able to use the website again.` : `${target?.name} will not be able to use protected features until you unblock them.`} />
    </div>
  );
}
