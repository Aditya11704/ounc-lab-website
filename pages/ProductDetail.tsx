
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/dataService';
import { Product, ProductOptionCategory } from '../types';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  // Store selected index for each category ID
  const [selections, setSelections] = useState<Record<string, number>>({});

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const prod = await getProductById(id);
        setProduct(prod);
        
        // Initialize selections
        if (prod && prod.configurableOptions) {
          const initialSelections: Record<string, number> = {};
          prod.configurableOptions.forEach(cat => {
            // Default to 0 (first option) for all categories
            initialSelections[cat.id] = 0;
          });
          setSelections(initialSelections);
        }
        
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center h-screen bg-[#F5F5F5]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center h-screen bg-[#F5F5F5]">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <Link to="/models" className="text-black hover:underline">Return to Models</Link>
      </div>
    );
  }

  const handleSelection = (categoryId: string, valueIndex: number) => {
    setSelections(prev => ({
      ...prev,
      [categoryId]: valueIndex
    }));
  };

  const calculateTotal = () => {
    let total = product.msrp;
    
    if (product.configurableOptions) {
      product.configurableOptions.forEach(cat => {
        const selectedIdx = selections[cat.id];
        if (selectedIdx !== undefined && cat.values[selectedIdx]) {
           total += cat.values[selectedIdx].priceMod;
        }
      });
    }
    
    return total;
  };

  return (
    <main className="flex-grow bg-[#F5F5F5] text-black">
      
      {/* Main Section: Split Layout */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 px-6 lg:px-12 py-12">
        
        {/* Left Column: Image Gallery & Headline */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="relative w-full aspect-[4/3] flex items-center justify-center mb-8">
            <button className="absolute left-0 size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
               <span className="material-symbols-outlined">chevron_left</span>
            </button>
            
            <img 
               src={product.imageUrl} 
               alt={product.name} 
               className="w-4/5 h-4/5 object-contain mix-blend-multiply"
            />
            
            <button className="absolute right-0 size-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-black hover:text-white transition-colors">
               <span className="material-symbols-outlined">chevron_right</span>
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 flex gap-2">
               <div className="w-2 h-2 rounded-full bg-black/60"></div>
               <div className="w-2 h-2 rounded-full bg-black/20"></div>
               <div className="w-2 h-2 rounded-full bg-black/20"></div>
               <div className="w-2 h-2 rounded-full bg-black/20"></div>
            </div>
          </div>
          
          <div className="text-center lg:text-left mt-4 mb-8 lg:mb-0">
             <h1 className="text-3xl lg:text-5xl font-bold leading-tight max-w-xl mx-auto lg:mx-0">
               {product.tagline}
             </h1>
          </div>
        </div>

        {/* Right Column: Configuration Card */}
        <div className="lg:col-span-4">
          <div className="bg-black text-white rounded-3xl p-8 sticky top-24 shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6">
               <div>
                  <h2 className="text-3xl font-bold font-display">{product.name}</h2>
                  <p className="text-xs text-gray-400 mt-1">{product.series}</p>
               </div>
               <div className="text-right">
                  <p className="text-xs text-gray-400 mb-1">Total Price</p>
                  <p className="text-2xl font-bold">₹{calculateTotal().toLocaleString()}</p>
               </div>
            </div>

            {/* Dynamic Configuration Categories */}
            {product.configurableOptions && product.configurableOptions.map((category) => (
              <div key={category.id} className="mb-8">
                 <h3 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4">{category.name}</h3>
                 
                 {/* Render logic based on category type */}
                 {category.type === 'color' ? (
                   <div className="grid grid-cols-2 gap-3">
                      {category.values.map((val, idx) => (
                        <button
                          key={val.name}
                          onClick={() => handleSelection(category.id, idx)}
                          className={`flex items-center gap-3 p-2 rounded-lg border transition-all text-left bg-[#1F1F1F] hover:bg-[#2A2A2A] ${selections[category.id] === idx ? 'border-white' : 'border-transparent'}`}
                        >
                          <div className="w-8 h-8 rounded shrink-0 border border-white/20" style={{ backgroundColor: val.hex || '#000' }}></div>
                          <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-white leading-tight">{val.name}</span>
                            <span className="text-[9px] text-gray-400">{val.priceMod === 0 ? '(Included)' : `(+${val.priceMod})`}</span>
                          </div>
                        </button>
                      ))}
                   </div>
                 ) : (
                   /* Default List Style for other options */
                   <div className="flex flex-col gap-2">
                     {category.values.map((val, idx) => (
                       <button
                          key={val.name}
                          onClick={() => handleSelection(category.id, idx)}
                          className={`flex justify-between items-center p-3 rounded-lg border transition-all bg-[#1F1F1F] hover:bg-[#2A2A2A] ${selections[category.id] === idx ? 'border-white' : 'border-transparent'}`}
                       >
                          <div className="text-left">
                             <span className="block text-xs font-bold text-white">{val.name}</span>
                             {val.description && <span className="block text-[10px] text-gray-400">{val.description}</span>}
                             {val.range && <span className="block text-[10px] text-gray-400">Range: {val.range}</span>}
                          </div>
                          <span className="text-[10px] font-bold text-gray-300">
                             {val.priceMod === 0 ? 'Included' : `+${val.priceMod}`}
                          </span>
                       </button>
                     ))}
                   </div>
                 )}
              </div>
            ))}

            <button className="w-full bg-white text-black font-bold py-4 rounded-lg uppercase tracking-wider text-xs hover:bg-gray-200 transition-colors mt-4">
              Proceed to Order →
            </button>

          </div>
        </div>
      </div>

      {/* Dynamic Features Section */}
      {product.features && product.features.length > 0 && (
        <section className="py-24 px-6 lg:px-12 bg-[#F0F0F0]">
          <div className="max-w-[1000px] mx-auto">
             <div className="text-center mb-20">
               <span className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-4 block">Under The Hood</span>
               <h2 className="text-4xl font-bold mb-4">Product Features</h2>
               <p className="text-gray-500 max-w-lg mx-auto">
                 {product.description}
               </p>
             </div>

             {product.features.map((feature, idx) => (
               <div key={idx} className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-24 mb-24 last:mb-0`}>
                  <div className="w-full lg:w-1/2">
                     <div className="bg-white rounded-[2rem] shadow-sm aspect-video overflow-hidden">
                        {feature.imageUrl && (
                          <img 
                            src={feature.imageUrl} 
                            alt={feature.title} 
                            className="w-full h-full object-cover"
                          />
                        )}
                     </div>
                  </div>
                  <div className="w-full lg:w-1/2">
                     <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                       {feature.description}
                     </p>
                  </div>
               </div>
             ))}
          </div>
        </section>
      )}

    </main>
  );
};

export default ProductDetail;
