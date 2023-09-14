import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mini Twitter',
  description: 'Portfolio project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='w-full min-h-screen text-gray-700 bg-[#f5f5f5]'>
          <div className='mx-auto max-w-xl h-full bg-[#f9f9f9]'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
