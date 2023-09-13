"use client"

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

interface Props {
  children: ReactNode;
}
export const Providers = ({children}: Props) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  }));
  return(
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
