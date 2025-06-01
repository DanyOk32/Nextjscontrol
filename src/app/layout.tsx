import './globals.css';
import { ReactNode } from 'react';


export const metadata = {
  title: 'Movies App',
  description: 'Browse your favorite movies by genre and rating',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
      <html lang="en">
      <body>
      {children}
      </body>
      </html>
  );
}

