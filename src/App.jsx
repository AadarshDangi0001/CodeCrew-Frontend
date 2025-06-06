import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/footer/Footer';
import Cursor from './components/cursor/Cursor';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      {/* <Navbar /> */}
      <Cursor />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  </AuthProvider>
);

export default App;

