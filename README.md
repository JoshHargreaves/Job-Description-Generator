# Job Description Generator

A Next.js and Tailwind CSS powered web application that leverages OpenAI to generate compelling, structured job descriptions. This tool is designed to help recruiters and HR professionals quickly create engaging job postings with customizable tones and formats.


## Features

- Generate creative and engaging job descriptions using AI.
- Choose between different tones (Story, Formal, Fun) for varied styles.
- Real-time preview and easy copy-to-clipboard functionality.
- Built with Next.js for fast performance and Tailwind CSS for modern styling.

![Screenshot](/docs/images/index-screenshot.png)

# Credits

https://github.com/shnai0/linkedin-post-generator

# API Key

- Create API key at http://openai.com
- Add API Key to OPENAI_API_KEY variable in .env.local

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm, yarn, or pnpm installed on your machine
- An OpenAI API Key (create one at [OpenAI](http://openai.com) and add it to your `.env.local` file)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Job-Description-Generator
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Create a `.env.local` file in the project root and add your OpenAI API Key:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running Locally

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
