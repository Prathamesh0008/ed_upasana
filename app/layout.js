// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EdPharma - Trusted Online Pharmacy",
  description:
    "Your trusted partner for medicines, healthcare products, and expert consultation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* 🔹 Cart Context Provider */}
        <CartProvider>
          {/* 🔹 Navbar */}
          <Navbar />

          {/* 🔹 Page content */}
          <main className="flex-grow">
            {children}
          </main> 

          {/* 🔹 Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}