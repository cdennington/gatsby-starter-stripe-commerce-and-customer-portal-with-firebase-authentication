import * as functions from 'firebase-functions';
import admin = require('firebase-admin');
import * as cors from 'cors';
import corsOptions from './utils/cors';

import stripeEventsHandler from './modules/stripe/events';
import checkoutHandler from './modules/stripe/checkout';
import subscriptionHandler from './modules/stripe/subscription';
import customerPortalHandler from './modules/stripe/customerPortal';

const firebaseConfig = {
  apiKey: functions.config().keys.firebase_apikey,
  authDomain: functions.config().keys.firebase_authdomain,
  projectId: functions.config().keys.firebase_projectid,
  storageBucket: functions.config().keys.firebase_storagebucket,
  messagingSenderId: functions.config().keys.firebase_messagingsenderid,
  appId: functions.config().keys.firebase_appid,
};

type Req = functions.https.Request;
type Res = functions.Response;

if (!admin.apps.length) {
  admin.initializeApp(firebaseConfig);
} else {
  admin.app(); // if already initialized, use that one
}

const testCors = (req: Req, res: Res, callback: (arg0: Req, arg1: Res) => void) => {
  cors(corsOptions)(req, res, async () => {
    callback(req, res);
  });
};

export const createCheckoutSession = functions.region('asia-southeast2').https.onRequest((req, res) => {
  testCors(req, res, checkoutHandler);
});
export const stripeEvents = functions.region('asia-southeast2').https.onRequest((req, res) => {
  testCors(req, res, stripeEventsHandler);
});
export const fetchSubscription = functions.region('asia-southeast2').https.onRequest((req, res) => {
  testCors(req, res, subscriptionHandler);
});
export const fetchCustomerPortal = functions.region('asia-southeast2').https.onRequest((req, res) => {
  testCors(req, res, customerPortalHandler);
});
