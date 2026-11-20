import { FiSearch, FiCalendar, FiCreditCard } from "react-icons/fi";
import SectionTitle from "./SectionTitle";

const steps = [
  { icon: FiSearch, title: "Pick a service", text: "Browse the menu, search by name and compare prices and durations." },
  { icon: FiCalendar, title: "Request a time", text: "Choose a date and a time slot. The salon reviews and confirms your request." },
  { icon: FiCreditCard, title: "Pay when confirmed", text: "Once confirmed, pay securely online from your dashboard and just show up." },
];

export default function HowItWorks() {
  return (
    <section className="section-y">
      <div className="container-x">
        <SectionTitle title="How It Works" text="Three simple steps from choosing a service to sitting in the chair." center />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="h-full rounded-box border border-base-300 p-6 text-center">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-secondary text-secondary-content"><s.icon className="h-6 w-6" /></span>
              <p className="mt-4 font-heading text-lg text-primary">Step {i + 1}</p>
              <h3 className="mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-base-content/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
