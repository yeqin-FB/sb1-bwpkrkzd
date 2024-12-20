import { WalletInfo } from '../../components/features/wallet/wallet-info'
import { PaymentForm } from '../../components/features/payment/payment-form'

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <WalletInfo />
      <PaymentForm />
    </div>
  )
}