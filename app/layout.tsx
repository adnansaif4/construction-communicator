import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NATIONAL ENGINEERS Ops',
  description: 'In-house construction communication and site operations platform',
  manifest: '/manifest.json',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'NE Ops' }
};
export const viewport: Viewport = { themeColor: '#111827', width: 'device-width', initialScale: 1, maximumScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body>{children}</body></html>;
}
