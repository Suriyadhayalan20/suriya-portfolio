
import { Inter, Space_Grotesk, Kanit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
});
const kanit = Kanit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700", "900"],
    variable: "--font-kanit",
});

export const metadata = {
    title: "Suriya's Portfolio",
    description: "Personal Portfolio Website",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={`${inter.variable} ${spaceGrotesk.variable} ${kanit.variable} font-sans antialiased`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
