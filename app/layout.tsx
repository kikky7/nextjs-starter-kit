import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Inter } from "next/font/google";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./globals.css";

const inter = Inter({ weight: ["400", "500", "700"], subsets: ["latin"] });

export const metadata = {
  title: "My Nextjs Starter App",
  description: "Create something great",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`bg-zinc-50 text-zinc-800 antialiased ${inter.className}`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>

        <ToastContainer
          position="bottom-right"
          theme="dark"
          transition={Slide}
        />
      </body>
    </html>
  );
}
