import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { graphql, navigate } from 'gatsby';
import type { PageProps } from 'gatsby';
import { notify } from 'react-notify-toast';
import Helper from '../utils/helper.ts';
import Layout from '../components/Layout.tsx';
import SEO from '../components/SEO.tsx';

interface QueryResult {
  allStripePrice: {
    edges: [];
  }
}

interface ProductResullt {
  unit_amount: number;
  id: string;
  currency: string;
  recurring: {
    interval: string
  };
  product: {
    name: string,
    id: string,
    description: string,
  };
}

/* global window */
const IndexPage: React.FC<PageProps<QueryResult>> = ({
  data,
}) => {
  const [loading, setLoading] = useState(false);
  const prices = data.allStripePrice.edges;

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get('success')) {
      notify.show('Order placed! You will receive an email confirmation.', 'success');
      window.history.replaceState(null, '', window.location.pathname);
    }

    if (query.get('canceled')) {
      notify.show('Order canceled -- continue to shop around and checkout when you\'re ready.', 'error');
      window.history.replaceState(null, '', window.location.pathname);
    }
  }, []);

  const triggerCheckout = (prod: ProductResullt) => {
    setLoading(true);
    const passData = {
      priceId: prod.id,
    };

    axios.post(
      `${process.env.GATSBY_FUNCTIONS_ENDPOINT}createCheckoutSession`,
      passData,
    ).then((resp: { data: { success: boolean; response: { url: string; }; }; }) => {
      if (resp.data.success) {
        navigate(resp.data.response.url);
      }
      setLoading(false);
    }).catch((err) => {
      console.error(err);
      setLoading(false);
    });
  };

  return (
    <Layout>
      <SEO title="Home" />
      <div className="px-4 py-5 my-5 text-center">
        <img className="d-block mx-auto mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57" />
        <h1 className="display-5 fw-bold">Centered hero</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Primary button</button>
            <button type="button" className="btn btn-outline-secondary btn-lg px-4">Secondary</button>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
          {prices.map((price: { node: ProductResullt }) => {
            const {
              id,
              product: {
                name,
                description,
              },
              recurring: {
                interval,
              },
            } = price.node;
            return (
              <div className="col" key={id}>
                <div className="card mb-4 rounded-3 shadow-sm">
                  <div className="card-header py-3">
                    <h4 className="my-0 fw-normal">
                      {name}
                    </h4>
                  </div>
                  <div className="card-body">
                    <h1 className="card-title pricing-card-title">
                      {Helper.toCurrency(price.node.unit_amount, price.node.currency)}
                      <small className="text-muted fw-light">
                        /
                        {interval}
                      </small>
                    </h1>
                    <ul className="list-unstyled mt-3 mb-4">
                      {description}
                    </ul>
                    <button
                      type="button"
                      disabled={loading}
                      className="w-100 btn btn-lg btn-outline-primary"
                      onClick={() => triggerCheckout(price.node)}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                          <span className="sr-only">Loading...</span>
                        </>
                      ) : (
                        <span>
                          Buy now
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export const IndexQuery = graphql`
  query IndexQuery {
    allStripePrice {
      edges {
        node {
          recurring {
            interval
          }
          id
          currency
          unit_amount
          product {
            description
            name
            id
          }
        }
      }
    }
  }
`;
