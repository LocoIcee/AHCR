import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { Providers } from './providers';
import { PaymentModalProvider } from '@/context/PaymentModalContext';
import GlobalPayments from '@/components/GlobalPayments';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AHCR",
  description: "Almost Home Canine Rescue",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PaymentModalProvider>
            <Header />
            {children}
            <GlobalPayments />
            <Footer />
          </PaymentModalProvider>
        </Providers>
        <Script src="https://www.paypal.com/sdk/js?client-id=AUd6J6g-t_SidUfE-VzzWYFPfGP3sCgQ3GsY6B_3SytmRX-OawWqQCwDA8f13KIqHeNTafswnIR1vLI8&currency=CAD" strategy="afterInteractive" />
      </body>
    </html>
  )
}
