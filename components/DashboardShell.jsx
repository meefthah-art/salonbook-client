"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiCalendar, FiUser, FiScissors, FiPlusCircle, FiUsers, FiCreditCard, FiMenu } from "react-icons/fi";
import { useApp } from "./Providers";

const customerLinks = [
  { href: "/dashboard/customer", label: "Overview", icon: FiHome },
  { href: "/dashboard/customer/appointments", label: "My Appointments", icon: FiCalendar },
  { href: "/dashboard/customer/profile", label: "My Profile", icon: FiUser },
];

const adminLinks = [
  { href: "/dashboard/admin", label: "Overview", icon: FiHome },
  { href: "/dashboard/admin/services", label: "Manage Services", icon: FiScissors, also: "/dashboard/admin/services/edit" },
  { href: "/dashboard/admin/services/add", label: "Add Service", icon: FiPlusCircle },
  { href: "/dashboard/admin/appointments", label: "Manage Appointments", icon: FiCalendar },
  { href: "/dashboard/admin/users", label: "Manage Users", icon: FiUsers },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: FiCreditCard },
  { href: "/dashboard/admin/profile", label: "My Profile", icon: FiUser },
];

export default function DashboardShell({ children }) {
  const pathname = usePathname();
  const { user } = useApp();
  const links = user.role === "admin" ? adminLinks : customerLinks;

  const isActive = (link) => pathname === link.href || (link.also && pathname.startsWith(link.also));
  const closeDrawer = () => {
    const box = document.getElementById("dash-drawer");
    if (box) box.checked = false;
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="dash-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content min-h-[calc(100vh-4rem)] bg-base-200/50">
        <div className="flex items-center gap-3 border-b border-base-300 bg-base-100 px-4 py-3 lg:hidden">
          <label htmlFor="dash-drawer" className="btn btn-ghost btn-sm btn-square" aria-label="Open menu"><FiMenu className="h-5 w-5" /></label>
          <span className="font-heading text-xl capitalize">{user.role} Dashboard</span>
        </div>
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
      <div className="drawer-side z-40 lg:top-16 lg:h-[calc(100vh-4rem)]">
        <label htmlFor="dash-drawer" className="drawer-overlay" aria-label="Close menu"></label>
        <aside className="h-full w-64 border-r border-base-300 bg-base-100 p-4">
          <p className="px-3 pb-3 font-heading text-xl capitalize">{user.role} Dashboard</p>
          <ul className="space-y-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={closeDrawer}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${isActive(link) ? "bg-primary text-primary-content" : "hover:bg-base-200"}`}>
                  <link.icon className="h-4 w-4" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
