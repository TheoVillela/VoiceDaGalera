import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Voice da Galera",
  description: "Aplicativo de voice para partidas de League of Legends",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-green-100 text-zinc-50 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
