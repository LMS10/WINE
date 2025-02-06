'use client';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AuthProvider } from '../context/auth-context';
import Header from '@/components/Header';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <div>
      <AuthProvider>
        <Header />
        <main className={isHome ? 'pt-0' : 'pt-[94px] mobile:pt-[74px]'}>{children}</main>
      </AuthProvider>
    </div>
  );
}
