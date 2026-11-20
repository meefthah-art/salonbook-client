"use client";
import { useState } from "react";
import { toast } from "sonner";
import { CATEGORIES } from "@/lib/constants";
import ImageUpload from "./ImageUpload";

export default function ServiceForm({ initial, onSubmit, busy, buttonText }) {
  const [form, setForm] = useState({
    serviceName: initial?.serviceName || "",
    category: initial?.category || "",
    description: initial?.description || "",
    price: initial?.price ?? "",
    duration: initial?.duration ?? "",
    status: initial?.status || "active",
  });
  const [image, setImage] = useState(initial?.image || "");

  const change = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (!form.serviceName.trim() || !form.category || !form.description.trim()) return toast.error("Please fill in the name, category and description.");
    if (!image) return toast.error("Please upload a service image.");
    if (!(Number(form.price) > 0)) return toast.error("Price must be a positive number.");
    if (!(Number(form.duration) > 0)) return toast.error("Duration must be a positive number.");
    onSubmit({ ...form, price: Number(form.price), duration: Number(form.duration), image });
  };

  return (
    <form onSubmit={submit} className="max-w-3xl space-y-5 rounded-box border border-base-300 bg-base-100 p-6">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label htmlFor="sname" className="mb-1 block text-sm font-medium">Service name</label>
          <input id="sname" className="input-field" value={form.serviceName} onChange={change("serviceName")} />
        </div>
        <div>
          <label htmlFor="scat" className="mb-1 block text-sm font-medium">Category</label>
          <select id="scat" className="select select-bordered w-full bg-base-100" value={form.category} onChange={change("category")}>
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="sstatus" className="mb-1 block text-sm font-medium">Status</label>
          <select id="sstatus" className="select select-bordered w-full bg-base-100" value={form.status} onChange={change("status")}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <label htmlFor="sprice" className="mb-1 block text-sm font-medium">Price ($)</label>
          <input id="sprice" type="number" min="1" step="0.5" className="input-field" value={form.price} onChange={change("price")} />
        </div>
        <div>
          <label htmlFor="sduration" className="mb-1 block text-sm font-medium">Estimated duration (minutes)</label>
          <input id="sduration" type="number" min="1" className="input-field" value={form.duration} onChange={change("duration")} />
        </div>
        <div className="md:col-span-2">
          <label htmlFor="sdesc" className="mb-1 block text-sm font-medium">Description</label>
          <textarea id="sdesc" rows={4} className="textarea textarea-bordered w-full bg-base-100" value={form.description} onChange={change("description")} />
        </div>
        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-medium">Service image</p>
          <ImageUpload value={image} onChange={setImage} />
        </div>
      </div>
      <button className="btn btn-primary" disabled={busy}>
        {busy && <span className="loading loading-spinner loading-sm" />}
        {buttonText}
      </button>
    </form>
  );
}
