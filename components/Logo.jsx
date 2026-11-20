import Link from "next/link";
import { GiScissors } from "react-icons/gi";

export default function Logo({ light = false }) {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label="SalonBook home">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-content">
        <GiScissors className="h-5 w-5" />
      </span>
      <span className={`font-heading text-2xl font-bold ${light ? "text-white" : ""}`}>SalonBook</span>
    </Link>
  );
}
