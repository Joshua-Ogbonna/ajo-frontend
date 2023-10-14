import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { AppContext } from "@/contexts/AppContext";
import { ChakraProvider } from "@chakra-ui/react";

require("@solana/wallet-adapter-react-ui/styles.css");

export default function App({ Component, pageProps }: AppProps) {
  const endpoint =
    "https://clean-still-choice.solana-devnet.discover.quiknode.pro/47c7d2e4519378619a50152dc3425c895aaffb6b/";

  const wallets = useMemo(() => [new PhantomWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <AppContext>
            <ChakraProvider>
              <Component {...pageProps} />
            </ChakraProvider>
          </AppContext>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
