"use client";
import { Suspense } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import PaymentResult from "@/components/PaymentResult";
import Spinner from "@/components/Spinner";

export default function PaymentSuccess() {
  return (
    <PrivateRoute role="customer">
      <Suspense fallback={<Spinner />}>
        <PaymentResult />
      </Suspense>
    </PrivateRoute>
  );
}
