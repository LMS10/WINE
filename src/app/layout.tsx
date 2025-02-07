import localFont from 'next/font/local';
import { AuthProvider } from '@/contexts/authContext';
import './globals.css';

const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <AuthProvider>{children}<div id='modal-root'></div></AuthProvider>
      </body>
    </html>
  );
}
