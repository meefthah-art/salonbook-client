export const CATEGORIES = [
  "Haircut & Styling",
  "Hair Coloring",
  "Hair Treatment",
  "Facial & Skincare",
  "Makeup",
  "Manicure & Pedicure",
  "Spa & Massage",
];

export const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export const STATUS_CLASS = {
  pending: "badge-warning",
  confirmed: "badge-success",
  cancelled: "badge-error",
  paid: "badge-success",
  unpaid: "badge-ghost",
  failed: "badge-error",
  active: "badge-success",
  inactive: "badge-ghost",
};

export const dashboardPath = (role) => (role === "admin" ? "/dashboard/admin" : "/dashboard/customer");

export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
