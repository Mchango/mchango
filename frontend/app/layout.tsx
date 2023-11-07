import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mchango',
  description: 'A Rotating Savings & Contribution Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" font-satoshi bg-primary padding">{children}</body>
    </html>
  );
}
