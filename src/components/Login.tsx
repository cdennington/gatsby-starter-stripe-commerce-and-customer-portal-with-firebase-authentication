import React, { useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import { useContextSelector } from '@fluentui/react-context-selector';
import firebase from 'firebase/compat/app';
import 'firebase/auth';
import * as firebaseui from 'firebaseui';
import Layout from './Layout.tsx';
import SEO from './SEO.tsx';
import { userContext } from '../../provider.tsx';

const AuthForm = () => {
  const fetchUser = useContextSelector(userContext, (v) => v.fetchUser);
  const fetchFirebaseAuth = useContextSelector(userContext, (v) => v.fetchFirebaseAuth);
  const updateUser = useContextSelector(userContext, (v) => v.updateUser);
  const userLoaded = useContextSelector(userContext, (v) => v.userLoaded);
  const firebaseUILocal = useRef(null);
  const inputEl = useRef(null);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if (fetchUser !== null) {
        if (userLoaded && fetchUser.length !== 0) {
          navigate('/app/dashboard');
        }
      }

      if (firebaseUILocal.current === null && fetchFirebaseAuth.length !== 0 && userLoaded) {
        const { AuthUI } = firebaseui.auth;
        firebaseUILocal.current = AuthUI.getInstance() || new AuthUI(fetchFirebaseAuth);
        const firebaseUiConfig = {
          callbacks: {
            signInSuccessWithAuthResult: () => true,
          },
          signInFlow: 'popup',
          signInSuccessUrl: `${process.env.GATSBY_SITE_URL}app/dashboard`,
          signInOptions: [
            {
              provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            },
          ],
          credentialHelper: firebaseui.auth.CredentialHelper.NONE,
          // Your terms of service url.
          tosUrl: `${process.env.GATSBY_SITE_URL}/terms`,
          // Your privacy policy url.
          privacyPolicyUrl: `${process.env.GATSBY_SITE_URL}/privacy`,
        };

        if (isMounted) {
          if (inputEl.current) {
            firebaseUILocal.current.start('#firebaseui-auth-container', firebaseUiConfig);
          }
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [fetchFirebaseAuth, updateUser, userLoaded, fetchUser]);

  return (
    <Layout>
      <SEO title="login" />
      <div className="page-login section">
        <div className="container">
          <div className="row">
            <div className="col col-sm-6 offset-sm-3">
              <div id="firebaseui-auth-container" ref={inputEl} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
