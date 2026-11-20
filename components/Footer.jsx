"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaXTwitter, FaInstagram, FaFacebookF } from "react-icons/fa6";
import { FiPhone, FiMail, FiMapPin, FiClock } from "react-icons/fi";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;

  const socials = [
    { icon: FaFacebookF, label: "Facebook", href: "https://web.facebook.com/her.imtee" },
    { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/imtee_yaaz" },
    { icon: FaXTwitter, label: "X", href:  "https://x.com/her_imtee" },
  ];

  return (
    <footer className="bg-secondary text-secondary-content">
      <div className="container-x grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
            Book haircuts, facials, makeup, nails and spa treatments online, and pay once your appointment is confirmed.
          </p>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 hover:bg-primary">
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/services" className="hover:text-white">Browse Services</Link></li>
            <li><Link href="/signin" className="hover:text-white">Sign In</Link></li>
            <li><Link href="/signup" className="hover:text-white">Sign Up</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Contact</h4>
          <ul className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3"><FiPhone className="mt-0.5 h-4 w-4 shrink-0" /> +880 1700-000000</li>
            <li className="flex items-start gap-3"><FiMail className="mt-0.5 h-4 w-4 shrink-0" /> hello@salonbook.com</li>
            <li className="flex items-start gap-3"><FiMapPin className="mt-0.5 h-4 w-4 shrink-0" /> House 12, Road 5, Agrabad, Chattogram</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xl text-white">Opening Hours</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li className="flex items-start gap-3"><FiClock className="mt-0.5 h-4 w-4 shrink-0" /> Sat - Thu: 9:00 AM - 7:00 PM</li>
            <li className="pl-7">Friday: 3:00 PM - 8:00 PM</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        &copy; {new Date().getFullYear()} SalonBook. All rights reserved.
      </div>
    </footer>
  );
}
