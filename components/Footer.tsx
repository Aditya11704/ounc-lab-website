import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import logo from '../assets/logo.svg';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert([{ email }]);
      
    if (error) {
      if (error.code === '23505') { 
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#2a2a2a] pt-16 pb-8 border-t-[4px] border-[#0ea5e9] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Column & Newsletter */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 text-white flex items-center">
                  <img src={logo} alt="Ounc Labs" className="h-full w-auto object-contain invert" />
                </div>
              </div>
              <p className="text-[#a1a1aa] max-w-sm mb-6 text-lg">
                Move without limits.
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-5 mb-8 flex-wrap">
                {/* WhatsApp */}
                <a href="https://wa.me/919603993399" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="WhatsApp">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 1.944 6.544L0 24l5.59-1.92A11.96 11.96 0 0 0 12 24a12 12 0 0 0 12-12 12 12 0 0 0-12-12zM12 21.962a9.96 9.96 0 0 1-5.088-1.397l-.364-.216-3.78 1.298 1.31-3.684-.236-.376A9.957 9.957 0 0 1 2.038 12 9.962 9.962 0 0 1 12 2.038 9.962 9.962 0 0 1 21.962 12 9.962 9.962 0 0 1 12 21.962zm5.464-7.464c-.3-.15-1.774-.876-2.048-.976-.275-.1-.475-.15-.675.15-.2.3-.775.976-.95 1.176-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.413-1.487-.893-.794-1.496-1.776-1.671-2.076-.175-.3-.018-.462.132-.612.134-.134.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.226-.244-.588-.492-.508-.675-.517-.175-.008-.375-.008-.575-.008-.2 0-.525.075-.8.375-.275.3-1.05 1.026-1.05 2.502 0 1.476 1.075 2.902 1.225 3.102.15.2 2.115 3.23 5.122 4.53.716.31 1.275.495 1.71.634.718.228 1.373.195 1.887.118.577-.086 1.774-.726 2.024-1.426.25-.7.25-1.301.175-1.426-.075-.125-.275-.2-.575-.35z"/>
                  </svg>
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com/company/ounclabs" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/ounclabs/" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                {/* Strava */}
                <a href="https://www.strava.com/athletes/115791144" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="Strava">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/profile.php?id=61555944696801" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@ounclabs" target="_blank" rel="noopener noreferrer" className="text-[#a1a1aa] hover:text-[#0ea5e9] transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Newsletter Form */}
            <div className="mt-4">
              <h4 className="font-bold uppercase text-white mb-4 text-xs tracking-widest">Join our Newsletter</h4>
              {status === 'success' ? (
                <p className="text-[#0ea5e9] font-bold text-sm">Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleNewsletter} className="flex gap-2 max-w-sm">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email address" 
                    className="bg-[#3f3f3f] text-white px-4 py-3 rounded-lg text-sm outline-none focus:ring-1 focus:ring-[#0ea5e9] w-full"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={status === 'loading'}
                    className="bg-[#0ea5e9] text-white px-6 py-3 rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#0284c7] transition-colors disabled:opacity-50"
                  >
                    {status === 'loading' ? '...' : 'Join'}
                  </button>
                </form>
              )}
              {status === 'error' && <p className="text-red-400 text-xs mt-2">Something went wrong. Please try again.</p>}
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-bold uppercase text-white mb-6 text-sm">SHOP</h4>
            <ul className="flex flex-col gap-4">
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/models">Bicycles</Link></li>
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/models">Components</Link></li>
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/models">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold uppercase text-white mb-6 text-sm">COMPANY</h4>
            <ul className="flex flex-col gap-4">
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/about">About Us</Link></li>
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 text-sm">Legal</h4>
            <ul className="flex flex-col gap-4">
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/terms">Terms</Link></li>
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/privacy">Privacy Policy</Link></li>
              <li><Link className="text-sm text-[#a1a1aa] hover:text-white transition-colors" to="/refunds">Refunds Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#3f3f3f] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-[#5c5c5c] uppercase">
          <div className="flex-1 text-center md:text-left">
             <p>2026 Ounc Labs Inc.</p>
          </div>
          
          <div className="flex-1 text-center">
             POWERED BY MONA
          </div>

          <div className="flex-1 text-center md:text-right">
            <Link className="hover:text-gray-400 transition-colors" to="/privacy">Privacy policies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;