import Link from "next/link";
import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full flex items-center justify-between px-16 p-4">
      {/* ...existing footer content... */}
      <span className="text-sm text-slate-600">
        Powered by <a href="https://openai.com/blog/chatgpt" className="hover:text-orange-600 font-bold">ChatGPT</a> &{" "}
        <a href="https://cotswoldjobs.co.uk" className="hover:text-orange-600 font-bold">Cotswold Jobs</a>
      </span>
      <ul className="flex items-center text-slate-900">
        <li className="mr-2">
          <Link href="https://github.com/JoshHargreaves/Job-Description-Generator" className="hover:text-orange-600">
            <FaGithub size={24} />
          </Link>
        </li>
        <li className="mr-2">
          <Link href="https://www.linkedin.com/in/joshua-hargreaves-5b544b63/" className="hover:text-orange-600">
            <FaLinkedin size={24} />
          </Link>
        </li>
        <li>
          <Link href="mailto:me@joshhargreaves.co.uk">
            <FaRegEnvelope size={24} />
          </Link>
        </li>
      </ul>
    </footer>
  );
}
