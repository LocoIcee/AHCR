'use client';
import { createContext, useContext, useState } from 'react';

const PaymentModalContext = createContext();

export function PaymentModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PaymentModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </PaymentModalContext.Provider>
  );
}

export function usePaymentModal() {
  return useContext(PaymentModalContext);
}