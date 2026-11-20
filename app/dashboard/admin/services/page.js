"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FiEdit2, FiTrash2, FiPlusCircle, FiScissors, FiSearch } from "react-icons/fi";
import { api } from "@/lib/api";
import { useApp } from "@/components/Providers";
import StatusBadge from "@/components/StatusBadge";
import EmptyState from "@/components/EmptyState";
import ConfirmModal from "@/components/ConfirmModal";
import SafeImg from "@/components/SafeImg";

export default function ManageServices() {
  const { tokenReady } = useApp();
  const [list, setList] = useState(null);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [deleting, setDeleting] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setQuery(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const load = () => {
    api(`/admin/services${query ? `?search=${encodeURIComponent(query)}` : ""}`)
      .then(setList)
      .catch((err) => {
        toast.error(err.message);
        setList([]);
      });
  };

  useEffect(() => {
    if (tokenReady) load();
  }, [tokenReady, query]);

  const toggleStatus = async (service) => {
    const status = service.status === "active" ? "inactive" : "active";
    try {
      await api(`/admin/services/${service._id}/status`, { method: "PATCH", body: { status } });
      toast.success(`Service is now ${status}.`);
      load();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteService = async () => {
    setBusy(true);
    try {
      await api(`/admin/services/${deleting._id}`, { method: "DELETE" });
      toast.success("Service deleted.");
      setDeleting(null);
      load();
    } catch (err) {
      toast.error(err.message);
      setDeleting(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="page-title">Manage Services</h1>
          <p className="mt-2 text-base-content/70">Only active services show on the public website.</p>
        </div>
        <Link href="/dashboard/admin/services/add" className="btn btn-primary gap-2"><FiPlusCircle className="h-4 w-4" /> Add Service</Link>
      </div>

      <label className="input input-bordered mt-6 flex max-w-sm items-center gap-2 bg-base-100">
        <FiSearch className="h-4 w-4 opacity-60" />
        <input className="grow" placeholder="Search by service name" value={search} onChange={(e) => setSearch(e.target.value)} />
      </label>

      <div className="mt-6">
        {list === null ? (
          <div className="space-y-3">{Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-16 w-full" />)}</div>
        ) : list.length === 0 ? (
          <EmptyState icon={FiScissors} title="No services found" text="Add your first service or change your search." actionLabel="Add Service" actionHref="/dashboard/admin/services/add" />
        ) : (
          <div className="overflow-x-auto rounded-box border border-base-300 bg-base-100">
            <table className="table">
              <thead><tr><th>Service</th><th>Category</th><th>Price</th><th>Duration</th><th>Status</th><th className="text-right">Actions</th></tr></thead>
              <tbody>
                {list.map((s) => (
                  <tr key={s._id}>
                    <td>
                      <div className="flex min-w-[200px] items-center gap-3">
                        <SafeImg src={s.image} alt="" className="h-12 w-16 rounded-md object-cover" />
                        <span className="font-semibold">{s.serviceName}</span>
                      </div>
                    </td>
                    <td>{s.category}</td>
                    <td className="font-semibold">${s.price}</td>
                    <td>{s.duration} min</td>
                    <td><StatusBadge value={s.status} /></td>
                    <td>
                      <div className="flex justify-end gap-2">
                        <button className="btn btn-ghost btn-sm" onClick={() => toggleStatus(s)}>{s.status === "active" ? "Deactivate" : "Activate"}</button>
                        <Link href={`/dashboard/admin/services/edit/${s._id}`} className="btn btn-outline btn-sm gap-1"><FiEdit2 className="h-3.5 w-3.5" /> Edit</Link>
                        <button className="btn btn-error btn-outline btn-sm gap-1" onClick={() => setDeleting(s)}><FiTrash2 className="h-3.5 w-3.5" /> Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ConfirmModal open={!!deleting} onClose={() => setDeleting(null)} onConfirm={deleteService} loading={busy} danger
        confirmText="Delete service" title="Delete this service?" message={`"${deleting?.serviceName}" will be removed for good. This cannot be undone.`} />
    </div>
  );
}
