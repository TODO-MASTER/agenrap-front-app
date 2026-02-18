import type { Metadata } from "next";
import { Cinzel, Figtree} from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
