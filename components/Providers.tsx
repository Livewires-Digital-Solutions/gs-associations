'use client';

import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            retry: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        position="bottom-center"
        richColors
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'var(--font-manrope), sans-serif',
            borderRadius: '16px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
            border: '1px solid rgba(226,232,240,0.8)',
            padding: '16px 20px',
            fontSize: '14px',
          },
        }}
      />
    </QueryClientProvider>
  );
}
