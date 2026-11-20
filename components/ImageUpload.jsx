"use client";
import { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "sonner";
import { uploadImage } from "@/lib/api";
import SafeImg from "./SafeImg";

export default function ImageUpload({ value, onChange, allowUrl = false }) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadImage(file);
      onChange(url);
      toast.success("Image uploaded.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {value && <SafeImg src={value} alt="Preview" className="h-40 w-full max-w-xs rounded-lg object-cover" />}
      <div className="flex flex-wrap items-center gap-2">
        <label className={`btn btn-outline btn-sm gap-2 ${uploading ? "btn-disabled" : ""}`}>
          {uploading ? <span className="loading loading-spinner loading-xs" /> : <FiUpload className="h-4 w-4" />}
          {value ? "Change image" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={handleFile} disabled={uploading} />
        </label>
        {allowUrl && (
          <input type="url" value={value || ""} onChange={(e) => onChange(e.target.value)} placeholder="or paste an image URL" className="input input-bordered input-sm min-w-0 flex-1 bg-base-100" />
        )}
      </div>
    </div>
  );
}
