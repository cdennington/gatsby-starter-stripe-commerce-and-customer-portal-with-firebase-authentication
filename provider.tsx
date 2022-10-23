import React, {
  useState,
  useMemo,
  useCallback,
} from 'react';
import { createContext } from '@fluentui/react-context-selector';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getAuth, onAuthStateChanged, getIdToken } from 'firebase/auth';
import axios, { AxiosResponse } from 'axios';

interface ContextValue {
  fetchFirebase: unknown;
  fetchUser: unknown;
  userLoaded: boolean;
  fetchFirebaseAuth: unknown;
  subscription: unknown;
  destroyUser: () => void;
}

export const userContext = createContext<ContextValue | null>(null);

const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.GATSBY_FIREBASE_PROJECT_ID,
  storageBucket: process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.GATSBY_FIREBASE_APP_ID,
  measurementId: process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
};

const ProviderApp = ({ children }) => {
  const app = useMemo(() => initializeApp(firebaseConfig), []);

  const [fb, setFb] = useState<string | unknown>(null);
  const [authenticatedUser, setUser] = useState<string | unknown>(null);
  const [fbAuth, setFbAuth] = useState<string | unknown>(null);
  const [userLoaded, setUserLoaded] = useState(false);
  const [subscription, setSubscription] = useState<string | unknown>(null);
  const [userToken, setUserToken] = useState<string | unknown>('');
  const destroyUser = useCallback(() => setUser(null), [setUser]);
  const context = useMemo(() => ({
    userToken,
    fetchFirebase: fb,
    fetchUser: authenticatedUser,
    userLoaded,
    fetchFirebaseAuth: fbAuth,
    subscription,
    destroyUser,
  }), [
    userLoaded,
    fb,
    fbAuth,
    authenticatedUser,
    destroyUser,
    subscription,
    userToken,
  ]);

  if (fb === null) {
    if (typeof window !== 'undefined') {
      const auth = getAuth();
      setFb(app);
      getAnalytics(app);
      setFbAuth(auth);

      onAuthStateChanged(auth, async (user) => {
        console.warn(user);
        if (user) {
          getIdToken(user).then(async (token) => {
            setUserToken(token);
            setUser(user);
            const db = getFirestore(app);
            const subscriptionRef = doc(db, 'subscriptions', `${user.uid}`);
            const subscriptionSnap = await getDoc(subscriptionRef);

            if (subscriptionSnap.exists()) {
              const subscriptionData = subscriptionSnap.data();
              const passData = {
                subscriptionId: subscriptionData.subscription,
              };

              axios.post(
                `${process.env.GATSBY_FUNCTIONS_ENDPOINT}fetchSubscription`,
                passData,
                { headers: { Authorization: `Bearer ${token}` } },
              ).then((resp: AxiosResponse) => setSubscription(resp.data.response)).catch((err) => {
                console.error(err);
              });
            }
            setUserLoaded(true);
          }).catch((error) => {
            console.error(error);
          });
        } else {
          setUserLoaded(true);
        }
      });
    }
  }

  /* eslint-disable react/prop-types */
  return (
    <userContext.Provider value={context}>
      {children}
    </userContext.Provider>
  );
};

/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
export default ({ element }) => (
  <ProviderApp>
    {element}
  </ProviderApp>
);
