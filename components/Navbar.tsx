import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient'; 
import logo from '../assets/logo.svg';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 lg:px-12 max-w-[1440px] mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-6 text-black">
            <img src={logo} alt="Ounc Labs" className="h-full w-auto object-contain" />
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          <nav className="flex gap-8">
            <Link to="/models" className="text-black text-sm font-bold hover:text-gray-600 transition-colors">Shop</Link>
            <Link to="/about" className="text-black text-sm font-bold hover:text-gray-600 transition-colors">About Us</Link>
            <Link to="/contact" className="text-black text-sm font-bold hover:text-gray-600 transition-colors">Contact</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            {session ? (
              <div className="flex items-center gap-3">
                <Link to="/cart" className="flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-black" title="View Cart">
                  <span className="material-symbols-outlined text-[20px]">shopping_cart</span>
                </Link>
                <Link to="/profile" className="flex h-10 items-center justify-center gap-2 rounded-lg border border-black bg-black hover:bg-gray-800 px-6 text-white text-sm font-bold transition-all uppercase">
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  Profile
                </Link>
              </div>
            ) : (
               <Link to="/signin" className="flex h-10 items-center justify-center rounded-lg border border-black hover:bg-black hover:text-white px-8 text-black text-sm font-bold transition-all uppercase">
                SIGN IN
               </Link>
            )}
          </div>
        </div>

        <button 
          className="lg:hidden text-black"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-100 p-6 flex flex-col gap-6 animate-fade-in-up absolute w-full top-full left-0 z-40 shadow-xl">
          <Link to="/models" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Shop</Link>
          <Link to="/about" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          <Link to="/contact" className="text-lg font-bold" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          <hr className="border-gray-100"/>
          
          {session ? (
            <div className="flex flex-col gap-3">
              <Link to="/cart" className="bg-gray-100 text-black flex items-center justify-center gap-2 p-4 rounded-lg font-bold uppercase transition-colors" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined">shopping_cart</span>
                CART
              </Link>
              <Link to="/profile" className="bg-black text-white flex items-center justify-center gap-2 p-4 rounded-lg font-bold uppercase transition-colors" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined">account_circle</span>
                MY PROFILE
              </Link>
            </div>
          ) : (
            <Link to="/signin" className="border border-black text-black p-4 rounded-lg text-center font-bold uppercase transition-colors" onClick={() => setIsMenuOpen(false)}>
              SIGN IN
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;