import './globals.css'
import { Inter } from 'next/font/google'
import Footer from "../components/Footer";
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Job-Description-Generator',
  description: 'Generate job descriptions using ChatGPT',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900">
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}