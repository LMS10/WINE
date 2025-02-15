'use client';
import { createContext, useContext, ReactNode } from 'react';
import { useWineDetail } from '@/lib/useWineDetail';

const WineContext = createContext<ReturnType<typeof useWineDetail> | null>(null);

export function WineDetailProvider({ children }: { children: ReactNode }) {
  const wineFetch = useWineDetail();
  return <WineContext.Provider value={wineFetch}>{children}</WineContext.Provider>;
}

export function useWineContext() {
  const context = useContext(WineContext);
  if (!context) {
    throw new Error('useWineContext must be used within a WineProvider');
  }
  return context;
}
