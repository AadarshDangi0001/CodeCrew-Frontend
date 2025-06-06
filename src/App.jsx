import React from 'react';
import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Cursor from './components/cursor/Cursor';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

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
  <AuthProvider>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </AuthProvider>
);

export default App;

