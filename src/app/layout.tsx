import "./globals.css";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HackDLRC",
  description: "The DLRC Hackathon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header
          className={`${openSans.className} flex items-center justify-between`}
        >
          <nav className="flex items-center text-zinc-500">
            <a href="/" className="px-2 pr-8 text-xl font-bold text-zinc-800">
              HackDLRC
            </a>
            {/* <a href="" className="px-2">About</a> */}
            {/* <a href="" className="px-2">Sponsors</a> */}
            <a href="" className="px-2">
              Leaderboard
            </a>
            <a href="" className="px-2">
              Help
            </a>
          </nav>

          <div className="absolute left-1/2 -translate-x-1/2 transform text-xl font-bold text-zinc-700">
            48:00:00
          </div>

          <nav className="flex items-center text-zinc-600">
            <div className="px-2 font-semibold">⭐ 30</div>
            <button className="rounded bg-slate-500 px-2 py-1 text-sm font-semibold text-white hover:bg-slate-600">
              Logged in as Ansh
            </button>
          </nav>
        </header>
        <div className="py-4">
          <hr />
        </div>

        {children}

        <footer className="bg-slate-100 w-full absolute left-0">
          <div className="m-4">
            ©️ DLRC Foundation 2023
          </div>
        </footer>
      </body>
    </html>
  );
}