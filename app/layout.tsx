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
          <div className='w-full h-full flex justify-center items-center relative'>
            <div className='max-w-[700px] lg:max-w-screen-xl w-full h-full flex relative'>
              <Sidebar />
              {children}
              <Aside />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
