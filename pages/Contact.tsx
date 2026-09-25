import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    interest: 'Commercial Partnership',
    message: '',
    privacy: false
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    const fullMessage = `
      Interest: ${formData.interest}
      Phone: ${formData.phone}
      Company: ${formData.company || 'N/A'}
      
      Message:
      ${formData.message}
    `;

    const { error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: fullMessage
        }
      ]);

    setSubmitting(false);
    if (!error) {
      setSubmitted(true);
    } else {
      alert("Something went wrong. Please try again.");
      console.error(error);
    }
  };

  if (submitted) {
    return (
      <main className="flex-grow flex items-center justify-center p-6 bg-[#F5F5F5] min-h-[60vh]">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md text-center animate-fade-in-up">
          <div className="size-20 bg-gray-100 text-black rounded-full flex items-center justify-center mx-auto mb-6">
             <span className="material-symbols-outlined text-4xl">check</span>
          </div>
          <h2 className="text-3xl font-bold mb-4 font-display">Message Sent!</h2>
          <p className="text-gray-500 mb-8 leading-relaxed">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <button 
            onClick={() => {
              setSubmitted(false);
              setFormData({ name: '', email: '', phone: '', company: '', interest: 'Commercial Partnership', message: '', privacy: false });
            }}
            className="w-full bg-black text-white py-4 rounded-lg font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-grow bg-white text-black">
      <section className="bg-black text-white pt-32 pb-24 px-6 lg:px-12 text-center">
         <div className="max-w-4xl mx-auto">
             <h1 className="text-3xl md:text-5xl lg:text-6xl font-black italic uppercase leading-[1.1] font-display mb-8 tracking-wide">
               Building Bicycles Is Our Passion, Supporting You Is Our Priority.
             </h1>
             <p className="text-lg md:text-xl text-gray-300 font-medium">
               Reach out to us for customized mobility solutions.
             </p>
         </div>
      </section>

      <section className="py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
           
           <div className="lg:col-span-5">
              <h2 className="text-2xl font-bold mb-8 font-display">Get in touch</h2>
              <div className="space-y-4">
                  <div className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center text-black shrink-0">
                          <span className="material-symbols-outlined text-xl">mail</span>
                      </div>
                      <div>
                          <h3 className="font-bold text-sm mb-1">Email Us</h3>
                          <p className="text-[11px] text-gray-400 mb-1 font-medium">For general inquiries and partnerships</p>
                          <a href="mailto:mail@ounc.in" className="text-sm font-bold text-black hover:underline">mail@ounc.in</a>
                      </div>
                  </div>

                   <div className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center text-black shrink-0">
                          <span className="material-symbols-outlined text-xl">call</span>
                      </div>
                      <div>
                          <h3 className="font-bold text-sm mb-1">Call Us</h3>
                          <p className="text-[11px] text-gray-400 mb-1 font-medium">Mon-Fri, 9am - 6pm IST</p>
                          <a href="tel:+919603993399" className="text-sm font-bold text-black hover:underline">+91 9603993399</a>
                      </div>
                  </div>

                  <div className="flex items-start gap-5 p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="size-10 rounded-lg bg-gray-100 flex items-center justify-center text-black shrink-0">
                          <span className="material-symbols-outlined text-xl">location_on</span>
                      </div>
                      <div>
                          <h3 className="font-bold text-sm mb-1">Registered Address</h3>
                          <p className="text-xs text-gray-400 leading-relaxed">Chinna Waltair, Visakhapatnam,<br/>Andhra Pradesh, India. 530017</p>
                      </div>
                  </div>
              </div>
           </div>

           <div className="lg:col-span-7">
               <div className="p-8 md:p-10 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 bg-white h-full">
                  <h2 className="text-2xl font-bold mb-8 font-display">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-900 ml-1">Full Name</label>
                              <input 
                                type="text" 
                                placeholder="John Doe" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-300 bg-gray-50/50"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-900 ml-1">Email Address</label>
                              <input 
                                type="email" 
                                placeholder="john@company.com" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-300 bg-gray-50/50"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                              />
                          </div>
                      </div>

                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-900 ml-1">Phone Number</label>
                              <input 
                                type="tel" 
                                placeholder="+91 99999 99999" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-300 bg-gray-50/50"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-900 ml-1">Company <span className="text-gray-400 font-normal">(Optional)</span></label>
                              <input 
                                type="text" 
                                placeholder="Company Name" 
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-300 bg-gray-50/50"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                              />
                          </div>
                      </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-900 ml-1">I am Interested in</label>
                          <div className="relative">
                            <select 
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all bg-gray-50/50 appearance-none"
                              value={formData.interest}
                              onChange={(e) => setFormData({...formData, interest: e.target.value})}
                            >
                              <option>Commercial Partnership</option>
                              <option>Technical Support</option>
                              <option>Other</option>
                            </select>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 material-symbols-outlined text-sm">expand_more</span>
                          </div>
                      </div>

                       <div className="space-y-2">
                          <label className="text-xs font-bold text-gray-900 ml-1">Message</label>
                          <textarea 
                             rows={4}
                             placeholder="Tell us about your project or questions..."
                             className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-black focus:border-black outline-none transition-all placeholder-gray-300 resize-none bg-gray-50/50"
                             value={formData.message}
                             onChange={(e) => setFormData({...formData, message: e.target.value})}
                             required
                          ></textarea>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                         <input 
                           type="checkbox" 
                           id="privacy"
                           className="rounded border-gray-300 text-black focus:ring-black size-4"
                           checked={formData.privacy}
                           onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                           required
                         />
                         <label htmlFor="privacy" className="text-xs text-gray-400">
                           I agree to the <a href="#" className="text-black underline">Privacy Policy</a> and authorize Ounc Labs to contact me about my inquiry.
                         </label>
                      </div>

                      <button 
                        type="submit" 
                        disabled={submitting}
                        className="w-full md:w-auto px-8 py-3 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg shadow-black/20 disabled:opacity-50"
                      >
                         {submitting ? 'Sending...' : 'Submit inquiry'} <span className="material-symbols-outlined text-sm">arrow_forward</span>
                      </button>
                  </form>
               </div>
           </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;