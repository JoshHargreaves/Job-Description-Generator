import Link from "next/link";
import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6">
      <div className="flex flex-col items-center text-center px-4 py-4">
        <span className="text-sm text-slate-600 mb-2">
          Powered by <a href="https://openai.com/blog/chatgpt" className="hover:text-orange-600 font-bold">ChatGPT</a> &{" "}
          <a href="https://cotswoldjobs.co.uk" className="hover:text-orange-600 font-bold">Cotswold Jobs</a>
        </span>
        <ul className="flex items-center text-slate-900 space-x-4">
          <li className="mr-2">
            <Link href="https://github.com/JoshHargreaves/Job-Description-Generator" className="hover:text-orange-600">
              <FaGithub size={24} />
              <span className="sr-only">GitHub</span>
            </Link>
          </li>
          <li className="mr-2">
            <Link href="https://www.linkedin.com/in/joshua-hargreaves-5b544b63/" className="hover:text-orange-600">
              <FaLinkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </li>
          <li>
            <Link href="mailto:me@joshhargreaves.co.uk">
              <FaRegEnvelope size={24} />
              <span className="sr-only">Email</span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
