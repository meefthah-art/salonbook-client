import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";
import Spinner from "@/components/Spinner";

export const metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <SignInForm />
    </Suspense>
  );
}
