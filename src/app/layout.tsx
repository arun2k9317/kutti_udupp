import type { Metadata } from "next";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { Providers } from "@/components/shared/Providers";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kutti Udupp | Children's Clothing Boutique — India",
    template: "%s | Kutti Udupp",
  },
  description:
    "Discover thoughtfully crafted organic cotton, linen, and handloom ethnic clothing for babies, boys, and girls across India.",
  keywords: [
    "kids clothing India",
    "children boutique",
    "baby organic clothes",
    "girls cotton frocks",
    "boys linen shirts",
    "kids ethnic wear India",
    "Kutti Udupp",
  ],
  openGraph: {
    title: "Kutti Udupp | Little Moments. Beautiful Styles.",
    description:
      "Independent Indian children's fashion boutique crafting breathable organic outfits for every little adventure.",
    type: "website",
    locale: "en_IN",
    siteName: "Kutti Udupp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmSans.variable}`}
      {...mantineHtmlProps}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
