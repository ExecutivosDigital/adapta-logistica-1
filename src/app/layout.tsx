import ChatWidget from "@/components/chatPopup";
import { ContextProviders } from "@/context/ContextProviders";
import { SidebarProvider } from "@/context/SidebarContext";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
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

        <Script id="ms_clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "spqckkh4xo");`}
        </Script>
      </head>
      <ContextProviders>
        <body className={`${poppins.variable}`}>
          <SidebarProvider>{children}</SidebarProvider>
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
