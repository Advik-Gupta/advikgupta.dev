import Image from "next/image";

import Navbar from "./components/navigation/navigation.component";
import Hero from "./components/hero/hero.component";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen px-8 sm:px-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <Hero />
      <main className="h-screen w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-8 sm:p-20 border border-red-500">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Wait, I am cooking up something special.
          </li>
          <li className="tracking-[-.01em]">
            The most awesome website loading here soon.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://github.com/Advik-Gupta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            See my github
          </a>
        </div>
      </main>
    </div>
  );
}
