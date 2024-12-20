'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useEffect, useState } from 'react'

export function useWalletBalance() {
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const [balance, setBalance] = useState<number | null>(null)

  useEffect(() => {
    if (!publicKey) return

    const fetchBalance = async () => {
      const balance = await connection.getBalance(publicKey)
      setBalance(balance / LAMPORTS_PER_SOL)
    }

    fetchBalance()
    const id = connection.onAccountChange(publicKey, () => fetchBalance())
    return () => {
      connection.removeAccountChangeListener(id)
    }
  }, [publicKey, connection])

  return { balance, publicKey }
}