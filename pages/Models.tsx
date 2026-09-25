import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Import the images directly from your assets folder
import flip1 from '../assets/Flip1.png';
import flip2 from '../assets/Flip2.png';
import flip3 from '../assets/Flip3.png';
import flip4 from '../assets/Flip4.png';

const flipSpecs = [
  { label: 'Frame', value: 'Aluminium alloy' },
  { label: 'Geometry', value: 'Tri fold - Upright' },
  { label: 'Crank', value: '54T' },
  { label: 'Drivetrain', value: '13-28T (7 speed)' },
  { label: 'Derailleur', value: '7 speed - Shimano Tourney' },
  { label: 'Shifter', value: 'Thumb shifter' },
  { label: 'Brakes', value: 'Front and rear disc brakes' },
  { label: 'Saddle', value: 'Cushioned seat' },
  { label: 'Tyres', value: '20×1.75"' },
  { label: 'Weight', value: '12 Kgs' },
];

const flipESpecs = [
  { label: 'Frame', value: 'Aluminium alloy' },
  { label: 'Geometry', value: 'Tri fold - Upright' },
  { label: 'Crank', value: '54T' },
  { label: 'Drivetrain', value: '13-28T (7 speed)' },
  { label: 'Derailleur', value: '7 speed - Shimano Tourney' },
  { label: 'Shifter', value: 'Thumb shifter' },
  { label: 'Brakes', value: 'Front and rear disc brakes' },
  { label: 'Saddle', value: 'Cushioned seat' },
  { label: 'Tyres', value: '20x1.75"' },
  { label: 'Weight', value: '12 Kgs' },
  { label: 'Max Speed', value: '25Km/h' },
  { label: 'Battery', value: '270W battery, 35+ kms range' },
  { label: 'Motor', value: '250W motor' },
  { label: 'Display', value: 'Digital cluster' },
  { label: 'Light', value: 'Horn, LED headlight, taillight' },
  { label: 'Ride Modes', value: 'Pedal, Pedal Assist, Throttle, Cruise, Walk Assist' },
];

const Models: React.FC = () => {
  const [activeModel, setActiveModel] = useState<'Flip' | 'Flip-E'>('Flip');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [flip1, flip2, flip3, flip4];

  const handleModelChange = (model: 'Flip' | 'Flip-E') => {
    setActiveModel(model);
    setCurrentImageIndex(0); // Reset to first image when switching models
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <main className="flex-grow bg-white text-black font-body overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 py-12">
        {/* Toggle */}
        <div className="flex justify-center mb-16 gap-4">
          <button
            onClick={() => handleModelChange('Flip')}
            className={`px-8 py-2 rounded-xl font-bold text-xl transition-all ${
              activeModel === 'Flip' ? 'border-2 border-gray-400 text-black' : 'border-2 border-transparent text-black hover:text-gray-600'
            }`}
          >
            Flip
          </button>
          <button
            onClick={() => handleModelChange('Flip-E')}
            className={`px-8 py-2 rounded-xl font-bold text-xl transition-all ${
              activeModel === 'Flip-E' ? 'border-2 border-gray-400 text-black' : 'border-2 border-transparent text-black hover:text-gray-600'
            }`}
          >
            Flip-E
          </button>
        </div>

        {/* Hero Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-24">
          {/* Left: Image Carousel */}
          <div className="flex flex-col lg:col-span-7 xl:col-span-8">
            
            <div className="relative flex items-center justify-center w-full h-[300px] md:h-[400px] lg:h-[500px]">
              <button 
                onClick={handlePrevImage}
                className="absolute left-0 lg:left-4 z-10 size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              <img 
                src={images[currentImageIndex]} 
                alt={`${activeModel} view ${currentImageIndex + 1}`} 
                className="w-full h-full object-contain px-12 transition-opacity duration-300"
              />

              <button 
                onClick={handleNextImage}
                className="absolute right-0 lg:right-4 z-10 size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors"
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            
            {/* Carousel Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`size-3 rounded-full transition-colors ${currentImageIndex === idx ? 'bg-gray-500' : 'bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right: Pricing Card */}
          <div className="flex flex-col lg:col-span-5 xl:col-span-4 pl-0 lg:pl-4 xl:pl-8">
            <h3 className="text-3xl lg:text-4xl font-bold leading-tight mb-6">
              The most compact<br />folding bicycle.
            </h3>

            <div className="bg-black text-white rounded-[2rem] p-8 flex flex-col shadow-2xl relative overflow-hidden">
              <div className="w-full flex justify-between items-start mb-10">
                <div>
                  <h2 className="text-2xl font-bold">{activeModel === 'Flip' ? 'Flip' : 'Flip - E'}</h2>
                  <p className="text-gray-400 text-xs mt-1 uppercase tracking-wider">{activeModel === 'Flip' ? 'Non Electric' : 'Electric'}</p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold border-b-2 border-white pb-1 whitespace-nowrap">
                    {activeModel === 'Flip' ? '₹29,999/-' : 'Coming Soon'}
                  </h2>
                </div>
              </div>

              <div className="w-full flex flex-col items-center justify-center">
                <Link to="/checkout" className="bg-white text-black px-6 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 mb-6 w-full text-xs tracking-wide uppercase">
                  Pre-Order Now <span className="opacity-30 mx-1">|</span> ₹2,000/-
                  <span className="material-symbols-outlined text-[16px] ml-1">arrow_forward</span>
                </Link>
                <p className="text-center font-medium text-xs px-2 text-gray-400 leading-relaxed italic">
                  "Pre-order now and get free<br />accessories worth up to ₹2,500."
                </p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="font-medium text-sm text-gray-500">
                Note: Deliveries starts in {activeModel === 'Flip' ? 'March 2027' : 'June 2027'}
              </p>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center uppercase tracking-widest text-gray-400 text-sm">Technical Specifications</h2>
          <div className="max-w-2xl mx-auto border-t border-gray-200">
            {(activeModel === 'Flip' ? flipSpecs : flipESpecs).map((spec, idx) => (
              <div key={idx} className="flex border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors">
                <div className="w-1/3 font-bold text-gray-800">{spec.label}</div>
                <div className="w-2/3 text-gray-600 font-medium">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 max-w-3xl mx-auto mb-24"></div>

        {/* Have questions? */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-8">Have questions?</h2>
          <p className="text-xl font-medium text-black max-w-2xl mx-auto mb-10 leading-relaxed">
            Feel free to reach out to us during our working<br />hours, we're always happy to help!
          </p>
          <Link to="/contact" className="inline-block bg-black text-white px-10 py-4 rounded-2xl font-bold hover:bg-gray-800 transition-colors">
            Contact <span className="material-symbols-outlined text-sm align-middle">arrow_forward</span>
          </Link>
        </div>

      </div>
    </main>
  );
};

export default Models;