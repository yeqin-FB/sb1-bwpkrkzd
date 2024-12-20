'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useState } from 'react'

export function useSolPayment() {
  const { publicKey, sendTransaction } = useWallet()
  const { connection } = useConnection()
  const [status, setStatus] = useState('')

  const sendPayment = async (recipient: string, amount: string) => {
    if (!publicKey) return

    try {
      setStatus('Processing...')
      const recipientPubKey = new PublicKey(recipient)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPubKey,
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      )

      const signature = await sendTransaction(transaction, connection)
      await connection.confirmTransaction(signature)
      setStatus('Payment successful!')
      return true
    } catch (error) {
      console.error('Error:', error)
      setStatus('Payment failed. Please try again.')
      return false
    }
  }

  return { sendPayment, status, publicKey }
}