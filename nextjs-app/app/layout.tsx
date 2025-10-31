import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bing Wallpaper - Daily 4K Ultra HD Wallpapers",
  description: "Browse and download daily 4K Ultra HD wallpapers from Bing. Beautiful images from around the world updated every day.",
  keywords: "bing wallpaper, 4k wallpaper, hd wallpaper, daily wallpaper, bing images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
