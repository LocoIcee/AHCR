import stripe from '@/lib/stripe';

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount) || amount <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid amount' }), {
        status: 400,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert dollars to cents
      currency: 'cad',
      automatic_payment_methods: { enabled: true },
    });

    return new Response(JSON.stringify({ clientSecret: paymentIntent.client_secret }), {
      status: 200,
    });
  } catch (error) {
  console.error('Stripe PaymentIntent error:', error.message);
  return new Response(
    JSON.stringify({ error: error.message || 'Internal server error' }),
    { status: 500 }
    );
  }
}