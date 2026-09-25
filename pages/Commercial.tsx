
import React from 'react';
import { Link } from 'react-router-dom';

const Commercial: React.FC = () => {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    alert("Brochure download started...");
    // In a real app, this would point to a Firebase Storage URL
  };

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0 opacity-40">
           <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1620802051789-22c544d656c9?q=80&w=2070&auto=format&fit=crop')" }}
          ></div>
        </div>
        <div className="relative z-20 flex flex-col items-center justify-center h-full px-4 text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-secondary/20 text-secondary border border-secondary/30 text-sm font-bold uppercase tracking-widest mb-2 animate-fade-in-up">
            Enterprise Solutions
          </div>
          <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight tracking-tight font-display animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Power Your Fleet with Ounc
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Customizable micro-mobility solutions for last-mile delivery, corporate campuses, and large-scale manufacturing hubs.
          </p>
          <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/contact" className="h-14 px-8 rounded-full bg-white text-slate-900 hover:bg-gray-100 text-base font-bold transition-all flex items-center justify-center gap-2">
              Contact Sales Team
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background-light dark:bg-background-dark">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div>
               <h2 className="text-3xl md:text-4xl font-bold text-[#0d141b] dark:text-white mb-6 font-display">Built for Business</h2>
               <div className="space-y-8">
                 <div className="flex gap-4">
                   <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <span className="material-symbols-outlined text-2xl">local_shipping</span>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Last-Mile Delivery</h3>
                     <p className="text-gray-600 dark:text-gray-400">Reduce delivery costs and carbon footprint with agile bikes designed for narrow city streets.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <span className="material-symbols-outlined text-2xl">factory</span>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Industrial Mobility</h3>
                     <p className="text-gray-600 dark:text-gray-400">Efficient movement within large campuses, factories, and warehouses with heavy-duty load capacity.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                     <span className="material-symbols-outlined text-2xl">branding_watermark</span>
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-[#0d141b] dark:text-white mb-2">Custom Branding</h3>
                     <p className="text-gray-600 dark:text-gray-400">Fleet vehicles painted and wrapped to match your corporate identity.</p>
                   </div>
                 </div>
               </div>
             </div>
             <div className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 text-center">
                <span className="material-symbols-outlined text-6xl text-gray-300 dark:text-gray-600 mb-6">menu_book</span>
                <h3 className="text-2xl font-bold text-[#0d141b] dark:text-white mb-4">Download Brochure</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
                  Get the full technical specifications, fleet pricing tiers, and case studies in our latest commercial catalog.
                </p>
                <button 
                  onClick={handleDownload}
                  className="w-full h-14 rounded-xl bg-slate-900 dark:bg-slate-700 text-white font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                >
                  <span>Download PDF</span>
                  <span className="material-symbols-outlined group-hover:translate-y-1 transition-transform">download</span>
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-primary">
        <div className="max-w-[1000px] mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-display">Ready to modernize your operations?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <Link to="/contact" className="h-14 px-8 rounded-full bg-white text-slate-900 text-base font-bold hover:bg-gray-100 hover:shadow-lg transition-all flex items-center justify-center">
               Schedule a Demo
             </Link>
             <Link to="/contact" className="h-14 px-8 rounded-full bg-black text-white border border-white/20 text-base font-bold hover:bg-gray-800 transition-all flex items-center justify-center">
               Talk to an Expert
             </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Commercial;
