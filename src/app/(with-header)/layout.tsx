import { ReactNode } from 'react';
import { AuthProvider } from '../context/auth-context';
import Header from '@/components/Header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <AuthProvider>
        <Header />
        {children}
      </AuthProvider>
    </div>
  );
}
