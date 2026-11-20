import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const heading = Cormorant_Garamond({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-heading", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: { default: "SalonBook | Book your salon appointment online", template: "%s | SalonBook" },
  description: "Browse salon services, request an appointment and pay online with SalonBook.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="salon" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
