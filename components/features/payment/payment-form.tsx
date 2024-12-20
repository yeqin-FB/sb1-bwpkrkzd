'use client'

import { useState } from 'react'
import { useSolPayment } from './use-sol-payment'
import { useWallet } from '@solana/wallet-adapter-react'

export function PaymentForm() {
  const { sendPayment, status, publicKey } = useSolPayment()
  const { connecting } = useWallet()
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await sendPayment(recipient, amount)
    if (success) {
      setRecipient('')
      setAmount('')
    }
  }

  if (connecting) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-yellow-600">
          钱包连接中，请稍候...
        </p>
      </div>
    )
  }

  if (!publicKey) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-center text-gray-600">
          请连接钱包以进行转账
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">发送 SOL</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            接收地址
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="输入 Solana 钱包地址"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            转账金额 (SOL)
          </label>
          <input
            type="number"
            step="0.000000001"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="输入转账金额"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          确认转账
        </button>
        {status && (
          <p className={`text-center ${
            status.includes('successful') ? 'text-green-600' : 'text-red-600'
          }`}>
            {status}
          </p>
        )}
      </form>
    </div>
  )
}