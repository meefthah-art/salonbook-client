"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FiEye, FiEyeOff, FiCheck, FiX } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import { useApp } from "@/components/Providers";
import GoogleButton from "@/components/GoogleButton";
import ImageUpload from "@/components/ImageUpload";

export default function SignUpPage() {
  const router = useRouter();
  const { user, loading } = useApp();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [image, setImage] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user && !busy) router.replace("/dashboard");
  }, [loading, user]);

  const change = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const rules = [
    { ok: form.password.length >= 6, text: "At least 6 characters" },
    { ok: /[A-Z]/.test(form.password), text: "One uppercase letter" },
    { ok: /[a-z]/.test(form.password), text: "One lowercase letter" },
  ];

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!rules.every((r) => r.ok)) return setError("Your password does not meet the rules below.");

    setBusy(true);
    const { error: err } = await authClient.signUp.email({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      image: image || undefined,
    });
    if (err) {
      const text = /exist/i.test(err.message || "") ? "An account with this email already exists." : err.message || "Sign up failed. Please try again.";
      setError(text);
      toast.error(text);
      setBusy(false);
      return;
    }
    toast.success("Welcome to SalonBook! Your account is ready.");
    router.push("/dashboard");
  };

  return (
    <section className="container-x grid min-h-[80vh] place-items-center py-12">
      <div className="w-full max-w-md rounded-box border border-base-300 bg-base-100 p-6 sm:p-8">
        <h1 className="text-4xl">Create your account</h1>
        <p className="mt-1 text-sm text-base-content/65">Join SalonBook to book your next appointment.</p>

        <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">Full name</label>
            <input id="name" className="input-field" value={form.name} onChange={change("name")} autoComplete="name" />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">Email</label>
            <input id="email" type="email" className="input-field" value={form.email} onChange={change("email")} autoComplete="email" />
          </div>
          <div>
            <p className="mb-1 text-sm font-medium">Profile image (optional)</p>
            <ImageUpload value={image} onChange={setImage} allowUrl />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">Password</label>
            <div className="relative">
              <input id="password" type={show ? "text" : "password"} className="input-field pr-11" value={form.password} onChange={change("password")} autoComplete="new-password" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/60" aria-label="Show or hide password">
                {show ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {form.password && (
              <ul className="mt-2 space-y-1 text-xs">
                {rules.map((r) => (
                  <li key={r.text} className={`flex items-center gap-1.5 ${r.ok ? "text-success" : "text-error"}`}>
                    {r.ok ? <FiCheck /> : <FiX />} {r.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {error && <p role="alert" className="rounded-lg bg-error/10 p-3 text-sm text-error">{error}</p>}
          <button className="btn btn-primary btn-block" disabled={busy}>
            {busy && <span className="loading loading-spinner loading-sm" />}
            Sign Up
          </button>
        </form>

        <div className="divider my-5 text-xs">or</div>
        <GoogleButton />
        <p className="mt-6 text-center text-sm text-base-content/70">
          Already have an account? <Link href="/signin" className="font-semibold text-primary hover:underline">Sign In</Link>
        </p>
      </div>
    </section>
  );
}
