"use client"; // This is a client component 
import DropDown, { ToneType } from '@/components/DropDown';
import Link from 'next/link';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaDiscord, FaGithub, FaLink, FaLinkedin, FaMailchimp, FaRegEnvelope, FaTwitter } from "react-icons/fa";

export default function Home() {
  const [generatedDescription, setGeneratedDescription] = useState<string>("");
  const [tone, setTone] = useState<ToneType>("Story");
  const [post, setPost] = useState<string>("");

  const [jobTitle, setJobTitle] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [salary, setSalary] = useState('');
  const [keywords, setKeywords] = useState('');

  // add more vibes as needed
  const handlePrompt = () => {
    let prompt = `I want you to act as a recruiter. I will provide some information about a job opening, and it will be your job to create an enganging job description. This will include a catchy opening paragraph, a responsibilities section, about us section and a skills required section.

    The name of the hiring company is ${companyName}, the job title is ${jobTitle} and the company industry is ${industry}. These keywords will help create the description ${keywords}.`;
    switch (tone) {
      case "Story":
        prompt + `It should be a story`;
        break;
      case "Formal":
        prompt + `It should be Formal`;
        break;
      case "Fun":
        prompt + `It should be Fun`;
        break;
      default:
        break;
    }
    return prompt;
  };

  // function to send post to OpenAI and get response
  const generateDescription = async (e: any) => {
    if (!jobTitle) {
      return null;
    }
    if (!industry) {
      return null;
    }
    if (!companyName) {
      return null;
    }
    if (!keywords) {
      return null;
    }

    e.preventDefault();
    setGeneratedDescription("");
    const prompt = handlePrompt();
    const response = await fetch("/api/generatedescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),

    });


    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      const formattedChunk = chunkValue.replace(/\n/g, "<br>");
      setGeneratedDescription((prev) => prev + formattedChunk);
    }
  };



  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6 sm:mt-6">
      <section className="py-10 lg:py-6 ">
        <div className="px-4">
          <div className='max-w-5xl mx-auto'>
            <h1 className="sm:text-6xl text-4xl font-bold text-slate-900">
              Generate A Job Description.
            </h1>
            <p className="sm:text-lg text-lg text-slate-600">
              Reach Talent Faster.
            </p>
            <div className="flex flex-col md:flex-row w-full md:p-12">
              <div className='flex md:flex-col sm:flex-row s:w-full md:w-2/4'>
                <div className="inline-block relative">
                  <form>
                    <div className="md:px-5 pb-5">
                      <input placeholder="Job Title" required name="jobTitle" onChange={e => { setJobTitle(e.currentTarget.value); }} className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white-100  border border-gray-300 rounded-md shadow-inner"></input>
                      <input placeholder="Industry" required onChange={e => { setIndustry(e.currentTarget.value); }} className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white-100  border border-gray-300 rounded-md shadow-inner"></input>
                      <input placeholder="Company Name" required onChange={e => { setCompanyName(e.currentTarget.value); }} className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white-100  border border-gray-300 rounded-md shadow-inner"></input>
                      <input placeholder="Salary" hidden type='number' className=" text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-white-100  border border-gray-300 rounded-md shadow-inner"></input>
                      <div className="block">
                        <DropDown tone={tone} setTone={setTone} />
                      </div>
                      <textarea max-Length="2000" required onChange={e => { setKeywords(e.currentTarget.value); }} placeholder="Keywords" className="text-black w-full h-56 px-4 py-2.5 mt-2 text-s bg-white border border-gray-300 rounded-md shadow-inner md:h-240" spellCheck="false"></textarea>
                      <button
                        className="bg-orange-600 rounded-md text-white font-medium px-4 py-2.5 sm:mt-2 mt-2 hover:bg-black/80 w-full"
                        onClick={(e) => generateDescription(e)}>
                        Generate Job Description
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className='flex md:flex-col sm:flex-row s:w-full md:w-2/4'>
                <div className="inline-block relative text-slate-900 w-full">
                  <Toaster
                    position="top-right"
                    reverseOrder={false}
                    toastOptions={{ duration: 2000 }}
                  />
                  {generatedDescription && (

                    <div className="max-w-5xl my-4 mx-auto">
                      <div
                        className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.write([
                            new ClipboardItem({
                              "text/html": new Blob([generatedDescription], { type: "text/html" }),
                            }),
                          ]);
                          toast("Post copied to clipboard", {
                            icon: "📋",
                          });
                        }}
                        key={generatedDescription}
                      >
                        <p className="text-slate-900" dangerouslySetInnerHTML={{ __html: generatedDescription }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-slate-400" />
        <footer className="z-20 w-full bg-inherit  flex items-center md:justify-between" >
          <div className="w-full mx-auto max-w-screen-xl px-16 p-4 md:flex md:items-center md:justify-between">
            <div className=''>
              <span className="text-sm sm:text-center text-slate-600">
                Powered by <a href="https://openai.com/blog/chatgpt" className='hover:text-orange-600 font-bold'
                > ChatGPT</a> &
                <a href="https://cotswoldjobs.co.uk" className='hover:text-orange-600 font-bold'
                > Cotswold Jobs</a>
              </span>
            </div>
            <div className=''>
              <ul className="flex items-center justify-center text-slate-900">
                <li className="mr-2">
                  <Link href="https://github.com/JoshHargreaves/Job-Description-Generator" className="hover:text-orange-600">
                    <FaGithub className="" style={{ fontSize: '24px' }} />
                  </Link>
                </li>
                <li className="mr-2">
                  <Link href="https://www.linkedin.com/in/joshua-hargreaves-5b544b63/" className="hover:text-orange-600">
                    <FaLinkedin className="" style={{ fontSize: '24px' }} />
                  </Link>
                </li>
                <li>
                  <Link href="mailto:me@joshhargreaves.co.uk" className="">
                    <FaRegEnvelope className="" style={{ fontSize: '24px' }} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </footer>
      </section>

    </main >
  )
}
