import Link from "next/link";

const bannerImage = "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80";

export default function Banner() {
  return (
    <section
      className="relative bg-secondary bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(90deg, rgba(43,30,48,0.92), rgba(43,30,48,0.55)), url(${bannerImage})` }}
    >
      <div className="container-x flex min-h-[480px] items-center py-16 sm:min-h-[560px]">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl leading-[1.05] sm:text-7xl">Look good. Feel better. Book in minutes.</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">
            Pick a service, choose a time that suits you and send your request. Pay online once the salon confirms your appointment.
          </p>
          <Link href="/services" className="btn btn-primary btn-lg mt-8">Explore Salon Services</Link>
        </div>
      </div>
    </section>
  );
}
