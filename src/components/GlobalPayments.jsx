'use client';
import Payments from './Payments';
import { usePaymentModal } from '@/context/PaymentModalContext';

export default function GlobalPayments() {
  const { isOpen, setIsOpen } = usePaymentModal();
  return <Payments isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}