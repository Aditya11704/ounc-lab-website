
export interface RichFeature {
  title: string;
  description: string;
  imageUrl: string;
  icon?: string;
  reverseLayout?: boolean;
}

export interface ProductOptionValue {
  name: string;
  priceMod: number; // Additional cost for this option
  hex?: string; // For color options
  range?: string; // For battery options
  description?: string; // For upgrades/other
}

export interface ProductOptionCategory {
  id: string; // e.g., 'color', 'battery', 'warranty'
  name: string; // Display name, e.g., "Select Color"
  type: 'color' | 'card' | 'list' | 'dropdown'; // How to render this category
  required: boolean; // Is selection mandatory?
  values: ProductOptionValue[];
}

export interface Product {
  id: string;
  name: string;
  series: 'Personal' | 'Utility' | 'Accessories' | 'Components';
  tagline: string;
  description: string;
  msrp: number;
  imageUrl: string;
  specs: {
    topSpeed: string;
    range: string;
    capacity: string;
    customFeature?: string;
    payload?: string;
    [key: string]: string | undefined; // Allow dynamic specs
  };
  features?: RichFeature[]; // Dynamic technical description sections
  // Dynamic configuration options from Firebase
  configurableOptions?: ProductOptionCategory[];
}

export interface TechnicalSpec {
  category: string;
  items: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  location: string;
  avatarUrl: string;
}

export interface ContactFormSubmission {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interest: string;
  message: string;
  privacyAgreed: boolean;
  createdAt: Date;
}
