import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nchango',
  description: 'A Rotating Savings & Contribution Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" font-satoshi bg-gray-950">{children}</body>
    </html>
  );
}
