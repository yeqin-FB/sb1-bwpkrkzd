'use client'

import Link from 'next/link'
import { WalletButton } from './wallet-button'

export function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-xl font-bold">
            Solana App
          </Link>
          <Link href="/dashboard" className="hover:text-gray-600">
            Dashboard
          </Link>
        </div>
        <WalletButton />
      </nav>
    </header>
  )
}