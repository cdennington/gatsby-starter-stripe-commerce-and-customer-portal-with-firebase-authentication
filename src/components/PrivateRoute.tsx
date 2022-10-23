import React, { ReactNode } from 'react';
import type { PageProps } from 'gatsby';
import { useContextSelector } from '@fluentui/react-context-selector';
import { userContext } from '../../provider.tsx';
import Login from './Login.tsx';

interface QueryResult {
  component: ReactNode,
}

/* eslint-disable react/jsx-props-no-spreading */
const PrivateRoute: React.FC<PageProps<QueryResult>> = ({ component: Component, ...rest }) => {
  const fetchUser = useContextSelector(userContext, (v) => v.fetchUser);

  if (fetchUser !== null) {
    if (fetchUser.length !== 0) {
      return <Component {...rest} />;
    }
  }

  return <Login />;
};

export default PrivateRoute;
