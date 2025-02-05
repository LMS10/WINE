import { ReactNode } from 'react';
import { AuthProvider } from '../context/auth-context';
import Header from '@/components/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-gray-100'>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </div>
  );
}
