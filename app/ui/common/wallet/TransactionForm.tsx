import { useState } from 'react';
import { useSolanaWallet } from '@/hooks/useSolanaWallet';
import { Button } from '@/components/ui/Button';

export function TransactionForm() {
  const { sendTransaction, isLoading, error, connected } = useSolanaWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;

    try {
      const signature = await sendTransaction(recipient, Number(amount));
      console.log('Transaction successful:', signature);
      // Reset form
      setRecipient('');
      setAmount('');
    } catch (err) {
      console.error('Transaction failed:', err);
    }
  };

  if (!connected) {
    return (
      <div className="text-center p-4">
        Please connect your wallet to make transactions
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Recipient Address
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter recipient's Solana address"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount (SOL)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Enter amount in SOL"
          step="0.000000001"
          min="0"
          required
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Send SOL'}
      </Button>
    </form>
  );
}