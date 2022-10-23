import React from 'react';
import { useContextSelector } from '@fluentui/react-context-selector';
import { Link } from 'gatsby';
import SEO from './SEO.tsx';
import Layout from './Layout.tsx';
import { userContext } from '../../provider.tsx';

interface SubscriptionProps {
  subscription: { plan: { active: boolean } }
}

interface FetchUserProps {
  fetchUser: { displayName: string },
}

const Dashboard = () => {
  const fetchUser = useContextSelector(userContext, (v: FetchUserProps) => v.fetchUser);
  const subscription = useContextSelector(userContext, (v: SubscriptionProps) => v.subscription);

  return (
    <Layout>
      <SEO title="Dashboard" />
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          <img className="d-block mx-auto mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
          <h1 className="display-5 fw-bold">
            Welcome
            {' '}
            {fetchUser.displayName}
          </h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/app/portal"
                className="btn btn-primary btn-lg px-4"
              >
                Customer portal
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="px-4 py-5 my-5 text-center">
          {subscription?.plan?.active && <h2>Your subscription is active</h2>}
          {subscription?.plan?.active === false && <h2>Your subscription is not active</h2>}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
