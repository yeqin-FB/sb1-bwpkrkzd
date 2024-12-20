import { useEffect, useState } from 'react';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';

export function WalletBalance() {
  const { fetchBalance, connected, publicKey } = useSolanaWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected && publicKey) {
      const getBalance = async () => {
        const bal = await fetchBalance();
        setBalance(bal);
      };
      getBalance();
    } else {
      setBalance(null);
    }
  }, [connected, publicKey, fetchBalance]);

  if (!connected) return null;

  return (
    <div className="text-sm font-medium text-gray-700">
      Balance: {balance !== null ? `${balance.toFixed(4)} SOL` : 'Loading...'}
    </div>
  );
}