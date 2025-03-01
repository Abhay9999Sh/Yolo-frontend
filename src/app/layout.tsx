import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { AuthProvider } from "@/lib/auth";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth App",
  description: "Authentication application with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
       
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
      </head>
      <body className={`${inter.className} bg-background text-foreground`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen flex items-center justify-center p-4">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
