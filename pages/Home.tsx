import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const Home: React.FC = () => {
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
    <main className="flex-grow font-body text-black bg-white overflow-hidden">
      
      {/* Hero Section */}
      <section className="w-full bg-white pt-12 pb-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-8 animate-fade-in-up">
            <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Unlock your<br />freedom of<br />mobility.
            </h1>
            <p className="text-xl text-black font-medium max-w-sm">
              The perfect solution for your first mile and last mile commute.
            </p>
            <div className="flex pt-4">
              <Link 
                to="/models" 
                className="px-8 py-4 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
              >
                Pre-Order Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex flex-col items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative w-full aspect-square max-w-lg flex items-center justify-center">
              <img 
                src="https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/Flip4.png" 
                alt="Folded Electric Bicycle" 
                className="object-cover w-full h-full rounded-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      {/* Build for the purpose Section */}
      <section className="w-full bg-white py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="order-2 lg:order-1 relative w-full rounded-[2rem] border-4 border-[#0ea5e9] overflow-hidden p-4 bg-white shadow-lg">
             <img 
               src="https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/Flip1.png" 
               alt="Unfolded Bicycle" 
               className="object-cover w-full aspect-[4/3] rounded-2xl"
             />
          </div>
          <div className="flex flex-col gap-6 order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Build for the purpose.<br />Freedom to Move.
            </h2>
            <div className="pl-0 lg:pl-12 pt-6">
              <p className="text-lg text-black leading-relaxed max-w-md font-medium">
                Meet Flip - the compact, lightweight tri-fold bicycle built to transform your daily routine. Designed to solve the first and last mile, Flip turns crowded commutes and tedious walks into effortless, fluid rides.
              </p>
            </div>
            <div className="pt-8 pl-0 lg:pl-12">
              <Link to="/models" className="px-8 py-4 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                Explore Flip <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      {/* Navigate Your World Section */}
      <section className="w-full bg-white py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-start lg:items-center">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight max-w-sm">
              Navigate Your<br />World with Flip.
            </h2>
            <p className="text-lg text-black font-medium max-w-md lg:ml-auto">
              Whether you're navigating the weekday rush or exploring on the weekend, Flip offers a smarter way to move around.
            </p>
          </div>

          <div className="w-full rounded-[2rem] overflow-hidden border border-gray-100 shadow-xl flex flex-col md:flex-row h-auto md:h-[500px]">
             {[
               { name: "TRAIN", image: "https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/train.png" },
               { name: "BUS", image: "https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/bus.png" },
               { name: "METRO", image: "https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/metro.png" },
               { name: "AUTO-RICKSHAW", image: "https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/auto.png" },
               { name: "CAB", image: "https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/car.png" }
             ].map((item, idx) => (
               <div key={idx} className="flex-1 relative group overflow-hidden border-r last:border-r-0 border-black/20 h-64 md:h-full">
                 <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75" />
                 <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center justify-end">
                   {item.name === "CAB" && (
                     <div className="mb-2">
                       <svg className="w-6 h-6 text-white/50" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M12 2L15 9H22L16.5 13.5L18.5 21L12 17L5.5 21L7.5 13.5L2 9H9L12 2Z" />
                       </svg>
                     </div>
                   )}
                   <span className="text-white font-bold tracking-widest text-sm italic">{item.name}</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Why FLIP Section */}
      <section className="bg-[#fcfcfc] py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-center text-sm font-bold tracking-[0.3em] uppercase mb-16">Why FLIP?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Easy to Fold.",
                desc: "Flip and folds in seconds without any awkward obstruction or resistance."
              },
              {
                title: "Easy to Carry.",
                desc: "At just 12Kgs it is designed to lift easily with one hand."
              },
              {
                title: "Easy to Store.",
                desc: "Occupies 30% less space than standard bi-folds bicycles."
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white rounded-[3rem] p-10 shadow-lg flex flex-col items-center text-center">
                <div className="w-full aspect-square mb-8 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                   <img 
                    src="https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/Flip4.png" 
                    alt="Folded Bike" 
                    className="object-cover w-full h-full mix-blend-multiply"
                  />
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-black font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Ounc Section */}
      <section className="w-full bg-white py-24 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <h3 className="text-center text-sm font-bold tracking-[0.3em] uppercase mb-16">Why Ounc?</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="relative w-full rounded-sm border-4 border-[#0ea5e9] p-2 bg-white">
               <img 
                 src="https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/Flip2.png" 
                 alt="Safety and Comfort" 
                 className="object-cover w-full aspect-[4/3]"
               />
            </div>
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                Built for You,<br />Engineered for Safety.
              </h2>
              <div className="pt-4">
                <p className="text-lg text-black leading-relaxed max-w-md font-medium mb-8">
                  We don't just build bicycles. We build solutions for your everyday commute. By listening to real riders and understanding their daily friction, we craft products that genuinely simplify their journey, all engineered to rigorous international safety standards. Because your safety and time matters.
                </p>
                <Link to="/about" className="px-8 py-4 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition-colors inline-flex items-center gap-2">
                  Discover Our Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="w-full h-px bg-gray-300"></div>
      </div>

      {/* Ready to Ride / Newsletter */}
      <section className="bg-white py-24 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Ride?</h2>
          <p className="text-black font-medium mb-12">
            Sign up for updates on new models, exclusive offers, and local events.
          </p>
          
          {status === 'success' ? (
            <p className="text-[#0ea5e9] font-bold text-lg">Thank you for subscribing!</p>
          ) : (
            <form className="flex flex-col sm:flex-row gap-0 overflow-hidden border border-gray-300 rounded-2xl" onSubmit={handleNewsletter}>
              <input 
                className="flex-1 px-6 py-4 bg-white text-black border-none focus:ring-0 outline-none placeholder-gray-500" 
                placeholder="Enter your mail" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                type="email"
              />
              <button className="bg-black text-white px-12 py-4 font-bold tracking-[0.3em] hover:bg-gray-800 transition-colors disabled:opacity-50" type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? '...' : 'JOIN'}
              </button>
            </form>
          )}
          {status === 'error' && <p className="text-red-500 text-xs mt-3">Something went wrong. Please try again.</p>}
        </div>
      </section>

    </main>
  );
};

export default Home;