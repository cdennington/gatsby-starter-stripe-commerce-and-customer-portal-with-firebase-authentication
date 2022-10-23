import React, { ReactNode } from 'react';
import Notifications from 'react-notify-toast';
import Navbar from './Navbar.tsx';
import Footer from './Footer.tsx';

interface LayoutProps {
  children: ReactNode,
}

const Layout = ({ children }: LayoutProps) => (
  <div className="page-wrapper">
    <Navbar />
    <main>
      {children}
    </main>
    <Footer />
    <Notifications />
  </div>
);

export default Layout;
