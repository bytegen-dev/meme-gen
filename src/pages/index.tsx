import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaTelegramPlane } from "react-icons/fa";
import { HiGlobeAlt } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 page-el flex page-el flex-col items-center justify-center">
        <header className="p-4 text-white text-center">
          <h1 className="text-4xl sax font-bold">MemeGen 💩</h1>
        </header>
        <main className="p-8 text-center mainres">
          <p>Just a basic meme generator built in 60 minutes with NEXT.js and Typescript 🙂</p>
          <Link href="/generate" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 primary-btn">
            Create a Meme
          </Link>
        </main>
      </div>
      <div className="center-me">
        <div className="bottom-details">
          <a href="https://bytegen.dev" target="_blank" className="link hjhgf">
            <HiGlobeAlt />
          </a>
          <a href="https://github.com/bytegen-dev" target="_blank" className="link">
            <FaGithub />
          </a>
          <a href="https://x.com/bytegen_dev" target="_blank" className="link">
            <FaXTwitter />
          </a>
        </div>
      </div>
    </>
  );
}
