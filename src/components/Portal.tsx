import React, { useEffect, useCallback } from 'react';
import { useContextSelector } from '@fluentui/react-context-selector';
import axios, { AxiosResponse } from 'axios';
import { navigate } from 'gatsby';
import { notify } from 'react-notify-toast';
import SEO from './SEO.tsx';
import Layout from './Layout.tsx';
import { userContext } from '../../provider.tsx';
import PageLoader from './PageLoader.tsx';

const Portal = () => {
  const userToken = useContextSelector(userContext, (v: { userToken: string }) => v.userToken);

  const navigateToCustomerPortal = useCallback(() => {
    const passData = {
      headers: { Authorization: `Bearer ${userToken}` },
    };

    axios.get(
      `${process.env.GATSBY_FUNCTIONS_ENDPOINT}fetchCustomerPortal`,
      passData,
    ).then((resp: AxiosResponse) => {
      if (resp.data.success) {
        navigate(resp.data.response.url);
      }
    }).catch((err) => {
      notify.show('Something has gone wrong, please contact support.', 'error');
      console.error(err);
    });
  }, [userToken]);

  useEffect(() => {
    navigateToCustomerPortal();
  }, [navigateToCustomerPortal]);

  return (
    <Layout>
      <SEO title="Portal" />
      <PageLoader />
    </Layout>
  );
};

export default Portal;
