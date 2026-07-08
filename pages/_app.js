import "@/styles/globals.css";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${sans.variable} ${mono.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  );
}
