import type { Metadata } from 'next';
import './globals.css';
// import { Nunito } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Mchango',
  description: 'A Rotating Savings & Contribution Platform',
};
// const nunito = Nunito({
//   subsets: ['latin'],
//   display: 'swap',
// }) 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className=" font-nunito">{children}</body>
    </html>
  );
}
