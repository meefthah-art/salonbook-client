"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { FiMenu, FiX, FiLogOut, FiGrid } from "react-icons/fi";
import Logo from "./Logo";
import SafeImg from "./SafeImg";
import { useApp } from "./Providers";
import { dashboardPath } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading, logout } = useApp();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Browse Services" },
  ];
  if (user) links.push({ href: dashboardPath(user.role), label: "Dashboard" });

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    toast.success("You have been signed out.");
    router.push("/");
  };

  const avatar = user && (
    user.image
      ? <SafeImg src={user.image} alt={user.name} className="h-9 w-9 rounded-full object-cover" />
      : <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-primary-content">{user.name?.[0]?.toUpperCase()}</span>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link key={l.label} href={l.href}
              className={`rounded-lg px-3 py-2 text-sm font-medium hover:text-primary ${isActive(l.href) ? "text-primary" : "text-base-content/75"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="skeleton h-9 w-24" />
          ) : user ? (
            <div className="dropdown dropdown-end hidden md:block">
              <div tabIndex={0} role="button" className="flex items-center gap-2 rounded-full ring-2 ring-primary/30" aria-label="Profile menu">
                {avatar}
              </div>
              <div tabIndex={0} className="dropdown-content z-[60] mt-2 w-60 rounded-box border border-base-300 bg-base-100 p-2 shadow-lg">
                <p className="truncate px-3 pt-2 font-semibold">{user.name}</p>
                <p className="truncate px-3 pb-2 text-xs capitalize text-base-content/60">{user.role}</p>
                <div className="my-1 h-px bg-base-300" />
                <Link href={dashboardPath(user.role)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-base-200">
                  <FiGrid className="h-4 w-4 text-primary" /> Dashboard
                </Link>
                <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-error hover:bg-base-200">
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Link href="/signin" className="btn btn-ghost btn-sm">Sign In</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          )}
          <button className="btn btn-ghost btn-circle btn-sm md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-base-300 bg-base-100 md:hidden">
          <div className="container-x flex flex-col gap-1 py-4">
            {links.map((l) => (
              <Link key={l.label} href={l.href} onClick={() => setOpen(false)}
                className={`rounded-lg px-3 py-2 text-sm font-medium ${isActive(l.href) ? "bg-primary/10 text-primary" : "hover:bg-base-200"}`}>
                {l.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">{avatar}<span className="truncate text-sm font-semibold">{user.name}</span></div>
                <button onClick={handleLogout} className="flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-error hover:bg-base-200">
                  <FiLogOut className="h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <div className="mt-2 flex gap-2">
                <Link href="/signin" onClick={() => setOpen(false)} className="btn btn-outline btn-sm flex-1">Sign In</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="btn btn-primary btn-sm flex-1">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
