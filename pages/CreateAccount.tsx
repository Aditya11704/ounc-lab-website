import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import logo from '../assets/logo.svg';

const CreateAccount: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', phone: '', email: '', username: '', password: '', terms: false, marketing: false
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.terms) {
      setError("You must agree to the Terms & Conditions.");
      return;
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            phone: formData.phone,
            username: formData.username,
            first_name: formData.firstName,
            last_name: formData.lastName,
            marketing_preference: formData.marketing
          }
        }
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              full_name: `${formData.firstName} ${formData.lastName}`
            }
          ]);
        
        if (profileError) console.error("Error creating profile record:", profileError);
      }

      console.log('Account created successfully');
      navigate(-1); 
    } catch (err: any) {
      setError(err.message || "Failed to create account.");
    }
  };

  const handleSocialLogin = async (providerName: string) => {
    const provider = providerName.toLowerCase() as 'google' | 'facebook' | 'github' | 'apple';
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message || `Failed to sign in with ${providerName}`);
  };

  return (
    <main className="flex-grow flex flex-col items-center justify-center bg-black min-h-[85vh] py-20 px-4">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase text-white mb-12 text-center tracking-wide font-display">
        Start Your Journey
      </h1>

      <div className="bg-white rounded-[2rem] p-8 md:p-12 w-full max-w-[550px] shadow-2xl relative">
        
        {/* Logo */}
        <div className="flex justify-center mb-10 text-black">
          <div className="h-8 flex items-center">
            <img src={logo} alt="Ounc Labs" className="h-full w-auto object-contain" />
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
             <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
              required
            />
             <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
              required
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
            required
          />

          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
            required
          />

          <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full bg-[#EEEEEE] text-black placeholder-gray-400 px-6 py-4 rounded-full border-none focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium"
            required
          />

          <div className="space-y-3 pt-2 px-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black transition-colors cursor-pointer"
                required
              />
              <span className="text-xs text-gray-500 font-medium group-hover:text-black transition-colors leading-tight">
                I agree to the <a href="#" className="underline text-black font-bold">Terms & Conditions</a> and <a href="#" className="underline text-black font-bold">Privacy Policy</a>.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.marketing}
                onChange={(e) => setFormData({...formData, marketing: e.target.checked})}
                className="w-5 h-5 mt-0.5 rounded border-gray-300 text-black focus:ring-black transition-colors cursor-pointer"
              />
              <span className="text-xs text-gray-500 font-medium group-hover:text-black transition-colors leading-tight">
                I want to receive updates about new products, events, and offers.
              </span>
            </label>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              className="flex-1 bg-black text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-black/20"
            >
              Create Account
            </button>
            <Link
              to="/signin"
              className="flex-1 bg-[#CCCCCC] text-black font-bold text-xs uppercase tracking-widest py-4 rounded-full hover:bg-[#B3B3B3] transition-colors text-center flex items-center justify-center"
            >
              Sign In Instead
            </Link>
          </div>
        </form>

        <div className="relative flex items-center justify-center my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <span className="relative bg-white px-4 text-sm font-bold text-black">or sign up with</span>
        </div>

        <div className="flex justify-center gap-4 pb-4">
          <button onClick={() => handleSocialLogin('Google')} className="size-12 rounded-full bg-[#E0E0E0] hover:bg-[#D0D0D0] transition-colors flex items-center justify-center" aria-label="Sign up with Google">
             <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
          </button>
          <button onClick={() => handleSocialLogin('Facebook')} className="size-12 rounded-full bg-[#E0E0E0] hover:bg-[#D0D0D0] transition-colors flex items-center justify-center" aria-label="Sign up with Facebook">
             <svg className="w-6 h-6 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.88c0-2.474 1.283-4.437 4.02-4.437 1.309 0 2.46.098 2.787.142v3.203H14.18c-1.127 0-1.579.538-1.579 1.54v1.432h3.66l-.606 3.667h-3.054v7.98h-3.5z" /></svg>
          </button>
          <button onClick={() => handleSocialLogin('GitHub')} className="size-12 rounded-full bg-[#E0E0E0] hover:bg-[#D0D0D0] transition-colors flex items-center justify-center text-black" aria-label="Sign up with GitHub">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>
          </button>
          <button onClick={() => handleSocialLogin('Apple')} className="size-12 rounded-full bg-[#E0E0E0] hover:bg-[#D0D0D0] transition-colors flex items-center justify-center text-black" aria-label="Sign up with Apple">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.88-3.08.45-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.45C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.06-.93 3.23-.93 1.57 0 3.46.75 4.18 1.88-3.51 1.76-2.9 6.35.6 7.74-.68 1.75-1.63 3.5-3.09 3.54zM12.03 5.39c-.16-1.95 1.6-3.89 3.42-3.95.19 2.03-1.96 4.04-3.42 3.95z" /></svg>
          </button>
        </div>

      </div>
    </main>
  );
};

export default CreateAccount;