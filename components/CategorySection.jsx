"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiScissors, GiHairStrands, GiLipstick, GiLotus } from "react-icons/gi";
import { FiDroplet, FiSmile, FiStar } from "react-icons/fi";
import { api } from "@/lib/api";
import SectionTitle from "./SectionTitle";

const icons = {
  "Haircut & Styling": GiScissors,
  "Hair Coloring": FiDroplet,
  "Hair Treatment": GiHairStrands,
  "Facial & Skincare": FiSmile,
  "Makeup": GiLipstick,
  "Manicure & Pedicure": FiStar,
  "Spa & Massage": GiLotus,
};

export default function CategorySection() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    api("/services/categories").then(setCategories).catch(() => setCategories([]));
  }, []);

  if (categories && categories.length === 0) return null;

  return (
    <section className="section-y bg-base-200">
      <div className="container-x">
        <SectionTitle title="Service Categories" text="Choose a category to see everything we offer in it." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories === null && Array.from({ length: 4 }).map((_, i) => <div key={i} className="skeleton h-32 w-full" />)}
          {categories && categories.map((c) => {
            const Icon = icons[c.category] || GiScissors;
            return (
              <Link key={c.category} href={`/services?category=${encodeURIComponent(c.category)}`}
                className="flex h-full flex-col rounded-box border border-base-300 bg-base-100 p-5 transition hover:border-primary hover:shadow-md">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-4 text-xl">{c.category}</h3>
                <p className="mt-1 text-sm text-base-content/65">{c.count} {c.count === 1 ? "service" : "services"}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
