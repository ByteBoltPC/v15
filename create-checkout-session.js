
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const items = JSON.parse(event.body);

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    })),
    mode: 'payment',
    success_url: 'https://yourdomain.com/confirmation.html',
    cancel_url: 'https://yourdomain.com/cart.html',
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ id: session.id }),
  };
};
