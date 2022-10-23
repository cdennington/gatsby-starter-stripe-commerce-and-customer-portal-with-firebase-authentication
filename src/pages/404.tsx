import React from 'react';
import { Link } from 'gatsby';
import Layout from '../components/Layout.tsx';
import SEO from '../components/SEO.tsx';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />

    <div className="error-area">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="container">
            <div className="error-content">
              <div className="notfound-404">
                <h1>Oops!</h1>
              </div>
              <h3>404 - Page not found</h3>
              <p>
                The page you are looking for might have been removed
                had its name changed or is temporarily unavailable.
              </p>

              <Link to="/it-startup" className="btn btn-primary">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
