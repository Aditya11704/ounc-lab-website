
import React from 'react';

const About: React.FC = () => {
  return (
    <main className="flex-grow bg-white text-black overflow-hidden font-body">
      
      {/* 1. Our Story Section */}
      <section className="pt-24 pb-16 px-6 lg:px-12 text-center max-w-[1200px] mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold uppercase tracking-[0.4em] mb-12 font-display">
          O U R &nbsp; S T O R Y
        </h1>
        <div className="space-y-6 max-w-[1000px] mx-auto">
          <p className="text-lg lg:text-xl italic font-medium text-black leading-relaxed">
            Ounc Labs was founded on a simple goal: to build sustainable mobility solutions for everyday life that challenges the traditional bicycle industry. From regular electric bi-cycles and cargo models to complex tilting tri-cycles and effortless foldables, Ounc Labs engineers diverse form factors specifically designed to solve the first and last-mile commute. Our team focuses on engineering advanced mobility solutions from the ground up, by delivering reliable, world-class products tailored for Indian riders. From our proprietary lightweight frames to our modular chassis architecture, every solution is built to be robust, safe, and effortless to ride.
          </p>
        </div>
      </section>

      {/* 2. Design Philosophy */}
      <section className="py-24 px-6 lg:px-12 bg-white text-black">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-xl lg:text-2xl font-bold uppercase tracking-[0.4em] mb-12">D E S I G N &nbsp; P H I L O S O P H Y</h2>
           <p className="text-3xl lg:text-4xl font-bold leading-relaxed max-w-3xl mx-auto">
             <span className="shadow-[inset_0_-0.3em_0_0_#0ea5e9]">"We believe good design should be simple, functional and minimal, built for every day use."</span>
           </p>
        </div>
      </section>

      {/* 3. Our Vision */}
      <section className="py-24 px-6 lg:px-12 bg-white text-black">
        <div className="max-w-[1000px] mx-auto text-center">
           <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-[0.4em] mb-12">V I S I O N</h2>
           <p className="text-lg lg:text-xl font-medium max-w-4xl mx-auto leading-relaxed">
             Our commitment to the planet goes beyond zero emissions. We prioritize recyclable materials, localized supply chains, and ethical manufacturing. We envision a world where cities are silent, air is clean, and neighborhoods are designed for people, not massive combustion vehicles.
           </p>
        </div>
      </section>

      {/* 4. Founder / CEO Section */}
      <section className="pb-32 pt-24 px-6 lg:px-12 bg-white max-w-[1200px] mx-auto mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="flex-1 order-2 lg:order-1">
            <p className="text-lg lg:text-xl font-medium text-black leading-relaxed">
              With a strong foundation in electronics and hands-on mechanical design, building intuitive products has always been my core passion. Mechanics served as my gateway into advanced engineering, rapid prototyping, and innovative product development. Driven by practical problem-solving and an execution-first mindset, I focus on crafting thoughtful solutions that genuinely improve everyday life. As an avid cyclist, I am now channeling this dedication into developing modern bicycles and micro-mobility vehicles—designed to be accessible, impactful, and built for everyone.
            </p>
          </div>
          
          <div className="w-full max-w-xs lg:w-auto flex flex-col items-center order-1 lg:order-2">
            <div className="w-48 h-48 lg:w-56 lg:h-56 mb-8 overflow-hidden rounded-[2rem] bg-gray-50 flex-shrink-0 shadow-lg border border-gray-100">
               <img 
                 src="https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/D.png" 
                 alt="Dinesh Kumar Mankena - Founder" 
                 className="w-full h-full object-cover filter contrast-125" 
               />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] mb-4 text-black">F o u n d e r</h3>
            <a href="https://www.linkedin.com/in/dineshkumarmankena/" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-black border-b-[2px] border-black hover:text-gray-600 hover:border-gray-600 transition-colors pb-1">
              Dinesh Kumar Mankena | LinkedIn
            </a>
          </div>
        </div>
      </section>

    </main>
  );
};
export default About;
