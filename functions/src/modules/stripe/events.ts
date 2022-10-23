import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import Stripe from 'stripe';
import sendEmail from '../../utils/email';
import makepassword from '../../utils/password';

const stripe = new Stripe(`${functions.config().keys.stripe_secret_key}`, {
  apiVersion: '2022-08-01',
});

interface IntentProps {
  customer: string,
  id: string,
  email: string,
  name: string,
}

type HttpsOnRequestHandler = Parameters<typeof functions.https.onRequest>[0];

const stripeEventsHandler: HttpsOnRequestHandler = async (req, res) => {
  const sig: string | string[] | Buffer | null = req.headers['stripe-signature'] !== undefined ? req.headers['stripe-signature'] : '';
  const endpointSecret = functions.config().keys.stripe_webhook_secret;

  try {
    const event: Stripe.Event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
    const intent: IntentProps = event.data.object as IntentProps;

    switch (event.type) {
      case 'customer.subscription.created':
        admin.firestore().collection('subscriptions').doc(intent.customer).set({ subscription: intent.id }, { merge: true })
          .then(() => res.status(200).send(JSON.stringify({ received: true })))
          .catch((err) => {
            console.error(err);
            res.status(400).send(JSON.stringify({ received: false }));
          });
        break;
      case 'customer.updated':
        if (typeof intent.email === 'string') {
          const { email, name } = intent;
          admin.auth()
            .getUser(intent.id)
            .then(() => {
              admin.auth().updateUser(intent.id, {
                email,
                displayName: name,
              }).then(() => res.status(200).send(JSON.stringify({ received: true })))
                .catch((err) => {
                  console.error(err);
                  res.status(400).send(JSON.stringify({ received: false }));
                });
            }).catch(() => {
              const passCode = makepassword(10);
              admin.auth().createUser({
                email,
                emailVerified: false,
                displayName: name,
                uid: intent.id,
                password: `${passCode}`,
              }).then(() => {
                const subject = 'Welcome to the QR code generator';
                const heading = 'Welcome to the QR code generator';
                const body = `<p style="margin-top:0;margin-bottom:15px;">Thanks you for signing up, we have generated an account with password ${passCode} for you.<br />Use the button below to login.</p>`;
                const btnText = 'View your account';
                const btnLink = `${functions.config().keys.domain}login`;
                sendEmail(email, name, subject, heading, body, btnText, btnLink);
                res.status(200).send(JSON.stringify({ received: true }));
              }).catch((err) => {
                console.error(err);
                res.status(400).send(JSON.stringify({ received: false }));
              });
            });
        }
        break;
      default:
        res.status(200).send(JSON.stringify({ received: true }));
    }

    res.status(200).send(JSON.stringify({ received: true }));
  } catch (err) {
    res.status(400).send(JSON.stringify({ received: false }));
  }
};

export default stripeEventsHandler;
