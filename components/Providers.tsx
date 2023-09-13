"use client"

import {ReactNode, useState} from "react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

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
      <ReactQueryDevtools initialIsOpen={false} position={"bottom-left"} panelPosition={"right"}/>
    </QueryClientProvider>
  )
}
