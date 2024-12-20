import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export function WalletButton() {
  const { wallet } = useWallet();

  return (
    <div className="wallet-button">
      <WalletMultiButton />
      <style jsx>{`
        .wallet-button :global(.wallet-adapter-button) {
          background-color: #512da8;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }
        .wallet-button :global(.wallet-adapter-button:hover) {
          background-color: #4527a0;
        }
      `}</style>
    </div>
  );
}