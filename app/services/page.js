import { Suspense } from "react";
import BrowseServices from "@/components/BrowseServices";
import Spinner from "@/components/Spinner";

export const metadata = { title: "Browse Services" };

export default function ServicesPage() {
  return (
    <Suspense fallback={<Spinner text="Loading services" />}>
      <BrowseServices />
    </Suspense>
  );
}
