
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-8 h-full border border-gray-100">
      <div className="w-full aspect-[4/3] mb-6 flex items-center justify-center">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-col items-center flex-grow w-full">
        <h3 className="text-2xl font-bold text-black mb-2 font-display">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-6 font-medium">{product.tagline}</p>
        <div className="mt-auto">
          <button className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors shadow-lg shadow-black/20">
            Know more
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
