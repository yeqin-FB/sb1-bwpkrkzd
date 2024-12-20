'use client'

import { useWalletBalance } from './use-wallet-balance'
import { useWallet } from '@solana/wallet-adapter-react'

export function WalletInfo() {
  const { balance, publicKey } = useWalletBalance()
  const { connecting } = useWallet()

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
          请连接钱包以查看余额
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">钱包信息</h2>
      <div className="space-y-2">
        <p>
          <span className="font-semibold">地址：</span>{' '}
          <span className="font-mono">{publicKey.toBase58()}</span>
        </p>
        <p>
          <span className="font-semibold">余额：</span>{' '}
          {balance !== null ? `${balance} SOL` : '加载中...'}
        </p>
      </div>
    </div>
  )
}