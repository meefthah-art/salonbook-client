import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-16 text-center">
      <div>
        <p className="font-heading text-8xl text-primary">404</p>
        <h1 className="mt-2 text-4xl">We could not find that page</h1>
        <p className="mx-auto mt-3 max-w-md text-base-content/70">The link may be old or the page may have moved. Let us take you back to a page that works.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to Home</Link>
          <Link href="/services" className="btn btn-outline">Browse Services</Link>
        </div>
      </div>
    </section>
  );
}
