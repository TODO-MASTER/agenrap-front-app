import type { Metadata } from "next";
import { Cinzel, Figtree} from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistCinzel = Cinzel({
  subsets:["latin"],
  display:'swap',
  variable: '--font-cinzel',
  weight: ['400','500',"600",'700','800','900']
});

const geistFigtree = Figtree({
  variable: "--font-tree",
  subsets: ["latin"],
    weight: ['300','400','700','900']
});

export const metadata: Metadata = {
  title: "agenrap",
  description: "Automatize sua agenda",
        icons: {
    icon: '/favicon.svg', 
    
  },
  
};
export const dynamic = 'force-dynamic'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistCinzel.variable} ${geistFigtree.variable} antialiased`}
      >
                <Toaster position="top-center" theme="dark" closeButton></Toaster>
        {children}
      </body>
    </html>
  );
}
