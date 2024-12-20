import { WalletProviders } from './wallet-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return <WalletProviders>{children}</WalletProviders>
}