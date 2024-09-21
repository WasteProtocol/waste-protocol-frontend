/* eslint-disable import/no-extraneous-dependencies */

'use client';

import React, { type ReactNode } from 'react';
import { sepolia } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { type Config, WagmiProvider, cookieToInitialState } from 'wagmi';

import { projectId, wagmiAdapter } from './config';

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error('Project ID is not defined');
}

const metadata = {
  name: 'appkit-example-scroll',
  description: 'AppKit Example - Scroll',
  url: 'https://scrollapp.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [sepolia],
  defaultNetwork: sepolia,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export default function ReownProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
