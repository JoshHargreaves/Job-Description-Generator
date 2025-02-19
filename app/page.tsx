"use client"; // This is a client component 

import DropDown, { ToneType } from "@/components/DropDown";
import { useState, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { track } from '@vercel/analytics';

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
    track('generate');
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
<main className="flex flex-col items-center justify-center mt-26 px-4 py-10 bg-gradient-to-br from-blue-50 to-purple-100">
  <section className="w-full max-w-4xl text-center">
    <h1 className="text-4xl sm:text-6xl font-bold text-gray-900">Generate A Job Description</h1>
    <p className="text-lg sm:text-xl text-gray-700 mt-2">Reach Talent Faster with AI-powered job descriptions.</p>

    {/* Flex Container for Form & Output */}
    <div className="mt-8 flex flex-col md:flex-row gap-8 items-start">
      
      {/* Input Form */}
      <form className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
        <div className="space-y-4">
          {["jobTitle", "industry", "companyName"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              required
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          ))}

          <DropDown tone={tone} setTone={setTone} />

          <textarea
            name="keywords"
            maxLength={2000}
            required
            onChange={handleChange}
            placeholder="Keywords"
            className="w-full h-40 px-4 py-3 text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            spellCheck="false"
          />

          <button
            className="w-full py-3 text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg font-medium transition hover:opacity-90 focus:ring-2 focus:ring-indigo-400"
            onClick={generateDescription}
          >
            🚀 Generate Job Description
          </button>
        </div>
      </form>

      {/* Output Display */}
      {generatedDescription && (
        <div className="w-full md:w-1/2 bg-white p-6 rounded-2xl shadow-xl border border-gray-200 cursor-copy hover:bg-gray-50 transition">
          <p
            className="text-gray-900"
            dangerouslySetInnerHTML={{ __html: generatedDescription }}
            onClick={() => {
              navigator.clipboard.writeText(generatedDescription);
              toast.success("Copied to clipboard!");
            }}
          />
        </div>
      )}
    </div>

    <hr className="h-px my-8 bg-gray-300 border-0" />
  </section>

  <Toaster position="top-right" reverseOrder={false} />
</main>


  );
}
