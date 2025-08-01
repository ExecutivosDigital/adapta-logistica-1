import ChatWidget from "@/components/chatPopup";
import { ContextProviders } from "@/context/ContextProviders";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Adapta Logística",
  icons: {
    icon: "/icon.png",
  },
  // viewport:
  //   "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta
          name="viewport"
          // content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <ContextProviders>
        <body className={`${poppins.variable}`}>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{ duration: 5000, className: "z-[1000000]" }}
          />
          <ChatWidget />
        </body>
      </ContextProviders>
    </html>
  );
}
