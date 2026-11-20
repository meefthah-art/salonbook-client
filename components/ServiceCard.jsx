import Link from "next/link";
import { FiClock } from "react-icons/fi";
import SafeImg from "./SafeImg";

export default function ServiceCard({ service }) {
  return (
    <article className="card h-full overflow-hidden border border-base-300 bg-base-100 transition-shadow hover:shadow-lg">
      <figure className="relative h-48 w-full shrink-0">
        <SafeImg src={service.image} alt={service.serviceName} className="h-full w-full object-cover" />
        <span className="badge badge-secondary absolute left-3 top-3 border-0">{service.category}</span>
      </figure>
      <div className="card-body flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-1 text-2xl" title={service.serviceName}>{service.serviceName}</h3>
        <div className="flex items-center justify-between text-sm">
          <span className="text-lg font-bold text-primary">${service.price}</span>
          <span className="flex items-center gap-1 text-base-content/65"><FiClock className="h-4 w-4" />{service.duration} min</span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-base-content/70">{service.description}</p>
        <div className="mt-auto pt-3">
          <Link href={`/services/${service._id}`} className="btn btn-primary btn-block">View Details</Link>
        </div>
      </div>
    </article>
  );
}
