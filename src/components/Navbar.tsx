import React, { useCallback } from 'react';
import { useContextSelector } from '@fluentui/react-context-selector';
import { Link, navigate } from 'gatsby';
import { userContext } from '../../provider.tsx';
import Logo from '../images/logo.inline.svg';

const Navbar = () => {
  const fetchUser = useContextSelector(userContext, (v) => v.fetchUser);
  const fetchFirebaseAuth = useContextSelector(userContext, (v) => v.fetchFirebaseAuth);
  const destroyUser = useContextSelector(userContext, (v) => v.destroyUser);

  const userExists = useCallback(() => {
    console.warn(fetchUser);
    if (fetchUser !== null) {
      return fetchUser.length !== 0;
    }

    return false;
  }, [fetchUser]);

  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a href="/" className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
          <Logo />
        </a>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
          <li><Link to="/" className="nav-link px-2 link-dark">Features</Link></li>
          <li><Link to="/" className="nav-link px-2 link-dark">Pricing</Link></li>
          <li><Link to="/" className="nav-link px-2 link-dark">FAQs</Link></li>
          <li><Link to="/" className="nav-link px-2 link-dark">About</Link></li>
        </ul>

        {userExists() ? (
          <div className="col-md-3 text-end">
            <Link to="/app/dashboard" className="btn btn-outline-primary me-2">Dashboard</Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fetchFirebaseAuth.signOut();
                destroyUser();
                navigate('/');
              }}
              className="btn btn-primary"
            >
              <span>Logout</span>
            </button>
          </div>
        ) : (
          <div className="col-md-3 text-end">
            <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
            <Link to="/login" className="btn btn-primary">Sign-up</Link>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
