
import React from 'react';
import { Link } from 'react-router-dom';

const Engineering: React.FC = () => {
  return (
    <main className="flex-grow font-body text-black bg-[#F5F5F5]">
      {/* Hero Section - Black Background */}
      <section className="bg-black text-white pt-32 pb-24 px-6 lg:px-12 text-center">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase leading-tight font-display mb-24 tracking-wide">
            We don’t just build bikes.<br />
            We make getting around<br />
            simpler for everyone.
          </h1>

          <h2 className="text-xl font-bold mb-12 text-white">Our Core Expertise</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-black mb-12">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full min-h-[300px] justify-center">
              <h3 className="text-lg font-bold mb-4">Inhouse Design</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Tailored for you and how you ride, so that you can keep the joy of riding alive. Each vehicle is a product of hours of design, engineering and communication with the user.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full min-h-[300px] justify-center">
              <h3 className="text-lg font-bold mb-4">Rapid Prototyping</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                We offer advanced prototyping services to bring your ideas to life, ensuring seamless design iterations and functionality testing.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 flex flex-col items-center text-center h-full min-h-[300px] justify-center">
              <h3 className="text-lg font-bold mb-4">Production</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Scalable manufacturing solutions with high precision and quality assurance to bring your product to market efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Light Section */}
      <section className="bg-[#F0F0F0] py-24 px-6 lg:px-12">
        <div className="max-w-[1100px] mx-auto">
            <h2 className="text-center text-2xl font-bold mb-24 font-display text-black">Shape possibilities with us.</h2>

            {/* Feature 1 */}
            <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 mb-32">
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-black">Personalized branding solutions for your business.</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4 font-medium">
                        Brand your bicycle with tailored design art work.
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                        Every bicycle becomes a visible brand ambassador and a powerful asset for your sustainable mobility strategy.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-3xl h-64 md:h-80 w-full shadow-sm overflow-hidden border border-gray-100">
                         <img 
                            src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2070&auto=format&fit=crop" 
                            alt="Branding Solutions" 
                            className="w-full h-full object-cover"
                         />
                    </div>
                </div>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24 mb-32">
                <div className="w-full md:w-1/2">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6 leading-tight text-black">For fleets and logistics</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-medium">
                        We also build mobility solutions for fleet owners, last mile logistic delivery partners and industrial in house logistics.
                    </p>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="bg-white rounded-3xl h-64 md:h-80 w-full shadow-sm overflow-hidden border border-gray-100">
                        <img 
                            src="https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?q=80&w=2070&auto=format&fit=crop" 
                            alt="Fleets and Logistics" 
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="text-center pt-8 pb-16">
                <h3 className="text-xl md:text-2xl font-bold mb-10 text-black">Reach out to us for customized mobility solutions.</h3>
                <Link to="/contact" className="inline-block px-12 py-4 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gray-800 transition-colors shadow-xl shadow-black/20">
                    Contact Us
                </Link>
            </div>
        </div>
      </section>
    </main>
  );
};

export default Engineering;
