import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MediaPulse — Media & Blog Studio',
  description: 'A fast, secure media management and blogging web application.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
