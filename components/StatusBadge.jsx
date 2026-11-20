import { STATUS_CLASS } from "@/lib/constants";

export default function StatusBadge({ value }) {
  return <span className={`badge ${STATUS_CLASS[value] || "badge-ghost"} capitalize`}>{value}</span>;
}
