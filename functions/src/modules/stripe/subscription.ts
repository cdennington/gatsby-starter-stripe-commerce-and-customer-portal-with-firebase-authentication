import * as functions from 'firebase-functions';
import Stripe from 'stripe';
import originIsAllowed from '../../utils/originIsAllowed';

const stripe = new Stripe(`${functions.config().keys.stripe_secret_key}`, {
  apiVersion: '2022-08-01',
});
type HttpsOnRequestHandler = Parameters<typeof functions.https.onRequest>[0];

const subscriptionHandler: HttpsOnRequestHandler = async (req, res) => {
  const authorization: string | null = req.headers.authorization !== undefined ? req.headers.authorization : '';
  const user = await originIsAllowed(authorization);
  if (user !== null) {
    const {
      subscriptionId,
    } = req.body;

    const subscription = await stripe.subscriptions.retrieve(`${subscriptionId}`);

    const retrnVal = {
      success: true,
      response: subscription,
    };
    res.status(200).send(JSON.stringify(retrnVal));
  } else {
    const retrnVal = {
      success: false,
    };
    res.status(400).send(JSON.stringify(retrnVal));
  }
};

export default subscriptionHandler;
