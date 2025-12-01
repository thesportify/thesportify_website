import "./globals.css";

import "./App.css";
import Navbar from "@/components/navbar";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "The Sportify Society | IIT Madras BS Degree",
  description: "The official sports society of IIT Madras BS Degree. Join us for events, competitions, and a vibrant community of sports enthusiasts.",
  keywords: ["Sportify", "IIT Madras", "BS Degree", "Sports Society", "Events", "Competitions", "MindMuse", "Actletics"],
  authors: [{ name: "The Sportify Society" }],
  openGraph: {
    title: "The Sportify Society | IIT Madras BS Degree",
    description: "The official sports society of IIT Madras BS Degree. Join us for events, competitions, and a vibrant community of sports enthusiasts.",
    url: "https://sportify.iitmbs.org",
    siteName: "The Sportify Society",
    images: [
      {
        url: "/icon.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Sportify Society",
    description: "The official sports society of IIT Madras BS Degree.",
    images: ["/icon.png"],
  },
  icons: {
    icon: "/icon.png",
  },
  metadataBase: new URL("https://sportify.iitmbs.org"),
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
