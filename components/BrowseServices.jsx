"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FiSearch, FiInbox } from "react-icons/fi";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { CATEGORIES } from "@/lib/constants";
import ServiceCard from "./ServiceCard";
import CardSkeleton from "./CardSkeleton";
import EmptyState from "./EmptyState";

export default function BrowseServices() {
  const params = useSearchParams();
  const [category, setCategory] = useState(params.get("category") || "all");
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCategory(params.get("category") || "all");
    setPage(1);
  }, [params]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let stopped = false;
    setLoading(true);
    const qs = new URLSearchParams({ sort, page, limit: 9 });
    if (category !== "all") qs.set("category", category);
    if (query) qs.set("search", query);

    api(`/services?${qs}`)
      .then((res) => !stopped && setData(res))
      .catch((err) => {
        if (stopped) return;
        toast.error(err.message);
        setData({ items: [], total: 0, pages: 0 });
      })
      .finally(() => !stopped && setLoading(false));
    return () => {
      stopped = true;
    };
  }, [category, query, sort, page]);

  const clearFilters = () => {
    setCategory("all");
    setSearch("");
    setQuery("");
    setSort("newest");
    setPage(1);
  };

  return (
    <>
      <section className="bg-base-200 py-12">
        <div className="container-x">
          <h1 className="page-title">Browse Services</h1>
          <p className="mt-2 text-base-content/70">Find the treatment you want and see the price and time it takes.</p>
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_200px]">
            <label className="input input-bordered flex items-center gap-2 bg-base-100">
              <FiSearch className="h-4 w-4 opacity-60" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="grow" placeholder="Search by service name" aria-label="Search services" />
            </label>
            <select className="select select-bordered bg-base-100" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} aria-label="Category">
              <option value="all">All categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <select className="select select-bordered bg-base-100" value={sort} onChange={(e) => { setSort(e.target.value); setPage(1); }} aria-label="Sort by price">
              <option value="newest">Newest first</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
        </div>
      </section>

      <section className="section-y">
        <div className="container-x">
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}</div>
          ) : data.items.length > 0 ? (
            <>
              <p className="mb-6 text-sm text-base-content/65">{data.total} {data.total === 1 ? "service" : "services"} found</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{data.items.map((s) => <ServiceCard key={s._id} service={s} />)}</div>
              {data.pages > 1 && (
                <div className="mt-10 flex justify-center">
                  <div className="join">
                    <button className="btn join-item" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                    <span className="btn join-item pointer-events-none">Page {page} of {data.pages}</span>
                    <button className="btn join-item" disabled={page >= data.pages} onClick={() => setPage(page + 1)}>Next</button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <EmptyState icon={FiInbox} title="No services found" text="Try another name, change the category or clear your filters." actionLabel="Clear filters" onAction={clearFilters} />
          )}
        </div>
      </section>
    </>
  );
}
