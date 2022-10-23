#### Gatsby JS + Firebase + Stripe

1. Create Firebase account
2. Create Stripe account
3. Create send in blue account
4. Download or clone this repo
5. Create .env.development file, using template below
6. Set up the Firebase [CLI]([CLI](https://firebase.google.com/docs/cli#install-cli-windows))
7. Set up the Stripe [CLI]([CLI](https://stripe.com/docs/stripe-cli))
8. In the functions folder create .runtimeconfig.json file, using template below
9. Add the Firebase hosting URL to the array on line 3 of functions\src\utils\cors.ts
10. Add the Firebase project ID to the .firebaserc file in the root

## .env.development
```
GATSBY_SITE_URL=http://localhost:8000/
GATSBY_FIREBASE_API_KEY=
GATSBY_FIREBASE_AUTH_DOMAIN=
GATSBY_FIREBASE_PROJECT_ID=
GATSBY_FIREBASE_STORAGE_BUCKET=
GATSBY_FIREBASE_MESSAGING_SENDER_ID=
GATSBY_FIREBASE_APP_ID=
GATSBY_FIREBASE_MEASUREMENT_ID=
GATSBY_FUNCTIONS_ENDPOINT=
GATSBY_STRIPE_SECRET_KEY=
```

## .runtimeconfig.json
```
{
  "keys": {
    "domain": "http://localhost:8000/",
    "stripe_secret_key": "",
    "stripe_webhook_secret": "",
    "firebase_apikey": "",
    "firebase_authdomain": "",
    "firebase_projectid": "",
    "firebase_storagebucket": "",
    "firebase_messagingsenderid": "",
    "firebase_appid": "",
    "send_in_blue_api_key": ""
  }
}
```

## Installation
Once you have run through the steps above, you should be able to run the project.

From the command line, in the root folder run:
```
npm install
```

To run the front end
```
npm run start
```

To run the firebase emulator run:
```
firebase emulators:start --only functions
```

To run the stripe CLI, replacing {firebase project ID} with your firebase project ID:
```
stripe listen --forward-to http://localhost:5001/{firebase project ID}/asia-southeast2/stripeEvents
```

## Deployment
Create a .env.production file, it should have the same keys as development but with the live values

You need to set up the firebase values as variables from the functions\.runtimeconfig.json file, use this line:
```
firebase functions:config:set keys.key_name="key value"
```
Build the project files so they are ready for deployment
```
npm run buil
```
Now deploy the code to firebase
```
firebase deploy
```
You can also deploy the funtions and hosting seperately, if needed:
```
firebase deploy --only functions
firebase deploy --only hosting
```
