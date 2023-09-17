import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/libs/providers';
import Sidebar from '@/components/sidebar/sidebar';
import Aside from '@/components/aside/aside';

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
      <body suppressHydrationWarning={true}>
        <Providers>
          {/* <div className='w-full min-h-screen text-gray-700 bg-[#f5f5f5]'>
            <div className='mx-auto max-w-xl h-full bg-[#f9f9f9]'>
              <div className='grid grid-cols-8 min-h-screen'>
                <div className='col-span-1'>
                  <NavBar />
                </div>
                <div className='col-span-7'>{children}</div>
              </div>
            </div>
          </div> */}

          {children}
        </Providers>
      </body>
    </html>
  );
}
