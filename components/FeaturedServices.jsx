"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiScissors } from "react-icons/fi";
import { api } from "@/lib/api";
import ServiceCard from "./ServiceCard";
import CardSkeleton from "./CardSkeleton";
import SectionTitle from "./SectionTitle";
import EmptyState from "./EmptyState";

export default function FeaturedServices() {
  const [services, setServices] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api("/services/featured")
      .then(setServices)
      .catch((err) => {
        setError(err.message);
        setServices([]);
      });
  }, []);

  return (
    <section className="section-y">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle title="Featured Services" text="A few of the treatments our customers book most." />
          <Link href="/services" className="btn btn-outline btn-primary">See all services</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services === null && Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}
          {services && services.map((s) => <ServiceCard key={s._id} service={s} />)}
        </div>
        {services && services.length === 0 && (
          <div className="mt-10">
            <EmptyState icon={FiScissors} title={error ? "Could not load services" : "No services yet"} text={error || "The salon has not added any services yet. Please check back soon."} />
          </div>
        )}
      </div>
    </section>
  );
}
