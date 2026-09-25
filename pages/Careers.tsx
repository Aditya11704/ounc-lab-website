
import React from 'react';
import { Link } from 'react-router-dom';

const Careers: React.FC = () => {
  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <div className="relative w-full min-h-[450px] flex items-center justify-center bg-cover bg-center" style={{backgroundImage: 'linear-gradient(rgba(16, 25, 34, 0.7), rgba(16, 25, 34, 0.5)), url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop")'}}>
        <div className="max-w-[960px] px-4 md:px-10 text-center z-10 flex flex-col gap-6">
          <h1 className="text-white text-5xl md:text-6xl font-black leading-tight tracking-[-0.033em] font-display">
            Build the Future
          </h1>
          <h2 className="text-slate-100 text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed">
            We’re looking for dreamers, doers, and makers to help us redefine urban mobility.
          </h2>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full bg-white dark:bg-surface-dark py-12 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold text-primary font-display">12</span>
            <span className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Open Roles</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold text-primary font-display">2</span>
            <span className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Offices</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold text-primary font-display">100%</span>
            <span className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Coverage</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-4xl md:text-5xl font-bold text-primary font-display">4.9</span>
            <span className="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Glassdoor</span>
          </div>
        </div>
      </div>

      {/* Content Splits - Impact */}
      <div className="py-20 px-4 md:px-20 lg:px-40 flex flex-col items-center gap-24 max-w-[1440px] mx-auto">
        <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-20">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-primary/10 rounded-lg text-primary">
                <span className="material-symbols-outlined">rocket_launch</span>
              </span>
              <h3 className="text-primary font-bold uppercase tracking-widest text-sm">Our Mission</h3>
            </div>
            <h2 className="text-text-main dark:text-white text-3xl md:text-4xl font-bold leading-tight font-display">Work That Matters</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              At Ounc Labs, your code hits the streets. Your designs shape the skyline. We aren't just building an app; we are building physical products that people trust with their lives every day. It's high stakes, high reward, and incredibly satisfying.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-1000" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop")'}}></div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-20">
          <div className="w-full md:w-1/2 flex flex-col gap-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <span className="material-symbols-outlined">favorite</span>
              </span>
              <h3 className="text-green-600 dark:text-green-400 font-bold uppercase tracking-widest text-sm">Benefits & Perks</h3>
            </div>
            <h2 className="text-text-main dark:text-white text-3xl md:text-4xl font-bold leading-tight font-display">We Take Care of You</h2>
            <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
              We believe that to build the best products, you need to be your best self. That's why we offer top-tier health insurance, unlimited PTO that we actually encourage you to use, and equity packages that give you true ownership in our success.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden shadow-2xl">
              <div className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-1000" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop")'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="bg-background-light dark:bg-background-dark py-24">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 dark:text-white font-display">Life at Ounc</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">A culture built on curiosity, collaboration, and ownership.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white dark:bg-surface-dark shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-800">
              <div className="size-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-primary mb-2">
                <span className="material-symbols-outlined text-3xl">diversity_3</span>
              </div>
              <h3 className="text-xl font-bold dark:text-white font-display">Inclusive Team</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Diversity isn't a buzzword here. We actively seek out different perspectives to help us solve complex problems.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white dark:bg-surface-dark shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-800">
              <div className="size-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-2">
                <span className="material-symbols-outlined text-3xl">school</span>
              </div>
              <h3 className="text-xl font-bold dark:text-white font-display">Continuous Learning</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Annual stipends for conferences, courses, and books. We want you to keep growing and leading in your field.
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-4 p-8 rounded-2xl bg-white dark:bg-surface-dark shadow-sm hover:shadow-lg transition-shadow border border-slate-100 dark:border-slate-800">
              <div className="size-16 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-2">
                <span className="material-symbols-outlined text-3xl">restaurant</span>
              </div>
              <h3 className="text-xl font-bold dark:text-white font-display">Great Food</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Daily catered lunches and a kitchen stocked with healthy snacks (and good coffee) to fuel your innovation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Open Positions */}
      <div className="py-24 px-4 md:px-10 max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
            <span className="text-primary font-bold uppercase tracking-widest text-sm">Opportunities</span>
            <h2 className="text-3xl md:text-4xl font-bold dark:text-white mt-2 font-display">Open Positions</h2>
        </div>
        
        <div className="space-y-8">
            {/* Engineering */}
            <div>
                <h3 className="text-xl font-bold dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Engineering</h3>
                <div className="space-y-3">
                    <div className="block group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary transition-all cursor-pointer">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">Senior Mechanical Engineer</h4>
                                <p className="text-sm text-gray-500">Austin, TX • On-site</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">arrow_forward</span>
                        </div>
                    </div>
                    <div className="block group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary transition-all cursor-pointer">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">Embedded Systems Engineer</h4>
                                <p className="text-sm text-gray-500">Austin, TX • Hybrid</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Design */}
            <div>
                <h3 className="text-xl font-bold dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Design</h3>
                <div className="space-y-3">
                    <div className="block group bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-primary transition-all cursor-pointer">
                        <div className="flex justify-between items-center">
                            <div>
                                <h4 className="font-bold text-lg dark:text-white group-hover:text-primary transition-colors">Product Designer (Hardware)</h4>
                                <p className="text-sm text-gray-500">San Francisco, CA • Hybrid</p>
                            </div>
                            <span className="material-symbols-outlined text-gray-400 group-hover:text-primary">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-primary py-20 px-4">
        <div className="max-w-[800px] mx-auto text-center text-white">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tight font-display">Don't see your role?</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-xl mx-auto">
            We are always looking for exceptional talent to join our team. Send us your resume and tell us how you can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="bg-white text-black hover:bg-gray-100 font-bold h-12 px-8 rounded-lg transition-colors shadow-lg flex items-center justify-center">
              Contact Recruiting
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Careers;
