import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KalvinCare - Dog Health & Behavior Analysis',
  description: 'Get personalized health and behavior insights for your dog using AI-powered analysis.',
};

// Dynamically import the Layout component with SSR disabled
const Layout = dynamic(() => import('./components/Layout'), {
  ssr: false
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
} 