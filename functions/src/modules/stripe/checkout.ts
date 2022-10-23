import * as functions from 'firebase-functions';
import Stripe from 'stripe';

const stripe = new Stripe(`${functions.config().keys.stripe_secret_key}`, {
  apiVersion: '2022-08-01',
});
type HttpsOnRequestHandler = Parameters<typeof functions.https.onRequest>[0];

const checkoutHandler: HttpsOnRequestHandler = async (req, res) => {
  const {
    priceId,
  } = req.body;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: `${priceId}`,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${functions.config().keys.domain}?success=true`,
    cancel_url: `${functions.config().keys.domain}?canceled=true`,
  });

  const retrnVal = {
    success: true,
    response: session,
  };
  res.status(200).send(JSON.stringify(retrnVal));
};

export default checkoutHandler;
