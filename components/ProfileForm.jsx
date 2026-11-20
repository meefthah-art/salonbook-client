"use client";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useApp } from "./Providers";
import ImageUpload from "./ImageUpload";

export default function ProfileForm() {
  const { user, refreshUser } = useApp();
  const [name, setName] = useState(user.name || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [image, setImage] = useState(user.image || "");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) return toast.error("Please enter your full name.");
    setBusy(true);
    try {
      await api("/profile", { method: "PUT", body: { name, phone, image } });
      await refreshUser();
      toast.success("Profile updated.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="max-w-xl space-y-5 rounded-box border border-base-300 bg-base-100 p-6">
      <div>
        <p className="mb-2 text-sm font-medium">Profile image</p>
        <ImageUpload value={image} onChange={setImage} allowUrl />
      </div>
      <div>
        <label htmlFor="pname" className="mb-1 block text-sm font-medium">Full name</label>
        <input id="pname" className="input-field" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="pphone" className="mb-1 block text-sm font-medium">Phone number</label>
        <input id="pphone" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXX-XXXXXX" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input className="input-field cursor-not-allowed opacity-70" value={user.email} readOnly />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Role</label>
          <input className="input-field cursor-not-allowed capitalize opacity-70" value={user.role} readOnly />
        </div>
      </div>
      <button className="btn btn-primary" disabled={busy}>
        {busy && <span className="loading loading-spinner loading-sm" />}
        Save changes
      </button>
    </form>
  );
}
