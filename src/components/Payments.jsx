'use client'
import React, { useState } from 'react';
import { CardElement, useStripe, useElements, PaymentElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { createPortal } from 'react-dom';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const StripeForm = ({
  amount,
  setAmount,
  loading,
  setLoading,
  message,
  setMessage,
  setClientSecret,
  setIsAmountConfirmed,
  handleConfirmAmount,
  onClose
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentElementReady, setPaymentElementReady] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!stripe || !elements) {
      setMessage("Stripe has not loaded yet.");
      return;
    }

    const paymentElement = elements.getElement(PaymentElement);
    if (!paymentElement) {
      setMessage("Payment form is not ready yet. Please wait a moment.");
      return;
    }

    setLoading(true);

    try {
      const result = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (result.error) {
        setMessage(result.error.message);
      } else {
        setMessage("success");
      }
    } catch (err) {
      console.error(err);
      setMessage('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message === "success" ? (
        <div className="text-center space-y-4">
          <h3 className="text-xl font-semibold text-green-600">Thank you!</h3>
          <p>Your donation was successful.</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Close
          </button>
        </div>
      ) : (
        <>
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
                onChange={(e) => {
                  setAmount(e.target.value);
                  setIsAmountConfirmed(false);
                  setClientSecret('');
                }}
                required
                name="donation-amount"
                className="w-full px-2 py-2 outline-none"
              />
            </div>
          </div>

          <PaymentElement onReady={() => setPaymentElementReady(true)} />
          {paymentElementReady ? (
            <button
              type="submit"
              disabled={!stripe || loading}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Donate'}
            </button>
          ) : (
            <p className="text-center text-sm text-gray-500">Loading payment form…</p>
          )}

          {message && message !== "success" && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}
        </>
      )}
    </form>
  );
};

const Payments = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [isAmountConfirmed, setIsAmountConfirmed] = useState(false);

  if (!isOpen) return null;
  if (typeof window === 'undefined') return null;

  const handleConfirmAmount = async () => {
    setMessage('');

    const parsedAmount = parseFloat(amount);
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      setMessage('Please enter a valid amount.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parsedAmount }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to initialize payment.');

      setClientSecret(data.clientSecret);
      setIsAmountConfirmed(true);
    } catch (err) {
      console.error(err);
      setMessage('Failed to initialize payment.');
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
        className="relative w-[70%] max-h-[80vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg border border-gray-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-semibold text-center mb-4">Make a Donation</h2>

        {clientSecret ? (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <StripeForm
              amount={amount}
              setAmount={setAmount}
              loading={loading}
              setLoading={setLoading}
              message={message}
              setMessage={setMessage}
              setClientSecret={setClientSecret}
              setIsAmountConfirmed={setIsAmountConfirmed}
              handleConfirmAmount={handleConfirmAmount}
              onClose={onClose}
            />
          </Elements>
        ) : (
          <form className="space-y-4">
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
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setIsAmountConfirmed(false);
                    setClientSecret('');
                  }}
                  required
                  name="donation-amount"
                  className="w-full px-2 py-2 outline-none"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleConfirmAmount}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Confirm Amount'}
            </button>
            {message && (
              <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
            )}
          </form>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Payments;
