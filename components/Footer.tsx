import Link from "next/link";
import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

export default function Footer() {
    return (
      <footer className="w-full py-6">
        <div className="max-w-5xl mx-auto flex flex-col items-center px-4 text-center">
          <span className="text-sm mb-2">
            Powered by{" "}
            <a href="https://openai.com/blog/chatgpt" className="hover:text-purple-500 font-bold">ChatGPT</a> &{" "}
            <a href="https://cotswoldjobs.co.uk" className="hover:text-purple-500 font-bold">Cotswold Jobs</a>
          </span>
          <ul className="flex items-center space-x-4">
            <li>
              <Link href="https://github.com/JoshHargreaves/Job-Description-Generator" className="hover:text-purple-500">
                <FaGithub size={24} />
                <span className="sr-only">GitHub</span>
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/in/joshua-hargreaves-5b544b63/" className="hover:text-purple-500">
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
  
  
