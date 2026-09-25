import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Models from './pages/Models';
import Contact from './pages/Contact';
import Commercial from './pages/Commercial';
import About from './pages/About';
import Careers from './pages/Careers';
import Engineering from './pages/Engineering';
import ProductDetail from './pages/ProductDetail';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Checkout from './pages/Checkout';
import RefundPolicy from './pages/RefundPolicy';
import ScrollToTop from './components/ScrollToTop';
import EditAddress from './pages/EditAddress';

// Import the new Profile component
import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/edit-address" element={<EditAddress />} />
          <Route path="/models" element={<Models />} />
          <Route path="/models/:id" element={<ProductDetail />} />
          <Route path="/commercial" element={<Commercial />} />
          <Route path="/technology" element={<Home />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/refunds" element={<RefundPolicy />} />
          
          {/* New Authenticated & E-commerce Routes */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={
            <div className="flex-grow flex items-center justify-center p-12 text-center">
              <div>
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">shopping_cart</span>
                <h2 className="text-2xl font-bold">Shopping Cart</h2>
                <p className="text-gray-500 mt-2">Cart functionality coming soon.</p>
              </div>
            </div>
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;