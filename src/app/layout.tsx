import localFont from 'next/font/local';
import { AuthProvider } from '@/contexts/AuthProvider';
import './globals.css';
import { ToastContainer, Slide } from 'react-toastify';

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
        <AuthProvider>
          {children}
          <div id='modal-root'></div>

          <ToastContainer
            toastStyle={{
              minHeight: 'unset',
              minWidth: 'unset',
              marginBottom: '30px',
            }}
            toastClassName='flex w-fit items-center justify-center rounded-[12px] bg-gray-800 px-7 py-[10px] text-lg text-white mobile:text-md'
            position='bottom-center'
            autoClose={2000}
            icon={false}
            closeButton={false}
            hideProgressBar
            newestOnTop={false}
            pauseOnFocusLoss
            draggable
            closeOnClick={true}
            pauseOnHover
            transition={Slide}
            limit={3}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
