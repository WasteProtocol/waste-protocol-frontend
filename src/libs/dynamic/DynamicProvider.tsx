'use client';

import { http } from 'viem';
import { mainnet } from 'viem/chains';
import { PropsWithChildren } from 'react';
import { createConfig, WagmiProvider } from 'wagmi';
import { FlowWalletConnectors } from '@dynamic-labs/flow';
import { CosmosWalletConnectors } from '@dynamic-labs/cosmos';
import { SolanaWalletConnectors } from '@dynamic-labs/solana';
import { BitcoinWalletConnectors } from '@dynamic-labs/bitcoin';
import { AlgorandWalletConnectors } from '@dynamic-labs/algorand';
import { StarknetWalletConnectors } from '@dynamic-labs/starknet';
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { DynamicWagmiConnector } from '@dynamic-labs/wagmi-connector';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DYNAMIC_ENV_ID } from 'src/config-global';

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: PropsWithChildren) {
  return (
    <DynamicContextProvider
      settings={{
        environmentId: DYNAMIC_ENV_ID!,
        walletConnectors: [
          EthereumWalletConnectors,
          AlgorandWalletConnectors,
          BitcoinWalletConnectors,
          CosmosWalletConnectors,
          FlowWalletConnectors,
          SolanaWalletConnectors,
          StarknetWalletConnectors,
        ],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>{children}</DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
