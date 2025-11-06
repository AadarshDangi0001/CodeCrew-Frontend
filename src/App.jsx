import React from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Cursor from './components/cursor/Cursor';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import PageLoader from './components/Loader/PageLoader';

const Layout = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Cursor />
      <AppRoutes />
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const App = () => (
  <PageLoader>
    <AuthProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthProvider>
  </PageLoader>
);

export default App;

