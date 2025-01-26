import Header from "@/components/Header";
import "./globals.css";
import Footer from "@/components/Footer";
import { Nunito } from "@next/font/google";

const fontNunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "SemDoll",
  description: "Handcrafted Dreams",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`flex min-h-dvh flex-col ${fontNunito.variable}`}>
        <Header />
        <main className="relative flex-grow">
          <div
            className="absolute inset-0 -z-10 bg-[url('/assets/background.webp')]"
            style={{
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
            }}
          ></div>

          <div className="relative z-10 flex h-full min-h-[80dvh] flex-col items-center justify-center">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
