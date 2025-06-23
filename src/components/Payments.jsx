'use client'
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPortal } from 'react-dom';

const Payments = ({ isOpen, onClose }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;
  if (typeof window === 'undefined') return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!stripe || !elements) return;

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseFloat(amount) }),
      });

      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        if (result.paymentIntent.status === 'succeeded') {
          setMessage('Donation successful! Thank you!');
          setAmount('');
        }
      }
    } catch (err) {
      setMessage('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Make a Donation</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Donation Amount (CAD):
            </label>
            <div className="flex items-center border border-gray-300 rounded-md px-3">
              <span className="text-gray-500">$</span>
              <input
                type="text"
                inputMode="decimal"
                pattern="^\d+(\.\d{0,2})?$"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>
          <div className="p-2 border border-gray-300 rounded-md bg-white">
            <CardElement />
          </div>
          <button
            type="submit"
            disabled={!stripe || loading}
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Donate'}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Payments;
