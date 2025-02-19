"use client"; // This is a client component 

import DropDown, { ToneType } from "@/components/DropDown";
import Link from "next/link";
import { useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaGithub, FaLinkedin, FaRegEnvelope } from "react-icons/fa";

export default function Home() {
  const [generatedDescription, setGeneratedDescription] = useState<string>("");
  const [tone, setTone] = useState<ToneType>("Story");
  const [formData, setFormData] = useState({
    jobTitle: "",
    industry: "",
    companyName: "",
    keywords: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePrompt = useCallback(() => {
    const { jobTitle, industry, companyName, keywords } = formData;
  
    return `
    I want you to act as a professional recruiter. Your task is to craft an engaging and compelling job description based on the provided job details.
  
    The final job description should be well-structured with clear section headings and formatted text, ensuring it is easy to copy and paste.
  
    **${jobTitle} – ${companyName}**
  
    **About the Role:**  
    Provide a captivating introduction that grabs attention, highlighting why this role is exciting and what makes the company unique.
  
    **Responsibilities:**  
    - List the key job responsibilities in bullet points.  
    - Ensure they are clear, concise, and action-driven.  
  
    **About Us:**  
    Provide a compelling description of the company, its mission, values, and why it's a great place to work.  
  
    **Skills & Qualifications:**  
    - List essential skills and qualifications.  
    - Include both technical and soft skills where relevant.  
  
    **Job Details:**  
    - **Company Name:** ${companyName}  
    - **Job Title:** ${jobTitle}  
    - **Industry:** ${industry}  
    - **Keywords:** ${keywords}  
  
    ${ 
      tone === "Story"
        ? "This job description should be written in a narrative style that feels immersive and engaging."
        : tone === "Formal"
        ? "This job description should be written in a professional and business-oriented tone."
        : tone === "Fun"
        ? "This job description should be written in a lighthearted, exciting, and conversational style."
        : ""
    }
    `;
  }, [formData, tone]);

  const generateDescription = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Check for empty fields
    if (Object.values(formData).some((value) => !value.trim())) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setGeneratedDescription("");
    const prompt = handlePrompt();

    try {
      const response = await fetch("/api/generatedescription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error("Failed to generate description");

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let description = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        description += decoder.decode(value).replace(/\n/g, "<br>");
        setGeneratedDescription(description);
      }
    } catch (error) {
      toast.error("An error occurred while generating the job description.");
    }
  };

  return (
    <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-6">
      <section className="py-10 lg:py-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="sm:text-6xl text-4xl font-bold text-slate-900">Generate A Job Description</h1>
          <p className="sm:text-lg text-lg text-slate-600">Reach Talent Faster.</p>
        </div>

        <div className="flex flex-col md:flex-row w-full md:p-12">
          {/* Input Form */}
          <div className="flex md:flex-col sm:flex-row w-full md:w-2/4">
            <form className="w-full p-5">
              {["jobTitle", "industry", "companyName"].map((field) => (
                <input
                  key={field}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1").trim()}
                  required
                  onChange={handleChange}
                  className="text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 border border-gray-300 rounded-md shadow-inner"
                />
              ))}
              <DropDown tone={tone} setTone={setTone} />
              <textarea
                name="keywords"
                maxLength={2000}
                required
                onChange={handleChange}
                placeholder="Keywords"
                className="text-black w-full h-56 px-4 py-2.5 mt-2 border border-gray-300 rounded-md shadow-inner"
                spellCheck="false"
              />
              <button
                className="bg-orange-600 rounded-md text-white font-medium px-4 py-2.5 mt-2 hover:bg-black/80 w-full"
                onClick={generateDescription}
              >
                Generate Job Description
              </button>
            </form>
          </div>

          {/* Output Display */}
          <div className="flex md:flex-col sm:flex-row w-full md:w-2/4">
            {generatedDescription && (
              <div className="max-w-5xl my-4 mx-auto">
                <div
                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedDescription);
                    toast.success("Post copied to clipboard!");
                  }}
                >
                  <p className="text-slate-900" dangerouslySetInnerHTML={{ __html: generatedDescription }} />
                </div>
              </div>
            )}
          </div>
        </div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-slate-400" />
      </section>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
