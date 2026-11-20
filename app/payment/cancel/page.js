import Link from "next/link";
import { FiXCircle } from "react-icons/fi";

export const metadata = { title: "Payment cancelled" };

export default function PaymentCancel() {
  return (
    <section className="container-x grid min-h-[60vh] place-items-center py-16 text-center">
      <div className="max-w-md">
        <FiXCircle className="mx-auto h-14 w-14 text-error" />
        <h1 className="mt-5 text-4xl">Payment cancelled</h1>
        <p className="mt-3 text-base-content/70">You did not complete the payment, so nothing was charged. You can pay any time from My Appointments.</p>
        <Link href="/dashboard/customer/appointments" className="btn btn-primary mt-6">Back to My Appointments</Link>
      </div>
    </section>
  );
}
