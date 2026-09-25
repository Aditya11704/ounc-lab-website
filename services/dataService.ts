
import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  query, 
  where 
} from "firebase/firestore";
import { 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup,
  OAuthProvider 
} from "firebase/auth";
import { db, auth } from "../firebaseConfig";
import { Product, TechnicalSpec, Testimonial, ContactFormSubmission } from '../types';

// --- Authentication Providers ---
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

export const socialLogin = async (providerName: string) => {
  let provider;
  switch (providerName) {
    case 'Google': provider = googleProvider; break;
    case 'Facebook': provider = facebookProvider; break;
    case 'GitHub': provider = githubProvider; break;
    case 'Apple': provider = appleProvider; break;
    default: throw new Error('Unsupported provider');
  }
  
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Social login error:", error);
    throw error;
  }
};

// --- Products (Inventory) ---
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Product));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }
};

// --- Testimonials ---
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "testimonials"));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Testimonial));
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
};

// --- Contact Form ---
export const submitContactForm = async (data: ContactFormSubmission): Promise<boolean> => {
  try {
    await addDoc(collection(db, "inquiries"), data);
    return true;
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};

// Mock Tech Specs (Or fetch from Firestore if needed)
export const getTechnicalSpecs = async (): Promise<TechnicalSpec[]> => {
  // If you want these from Firebase, create a 'tech_specs' collection
  return new Promise((resolve) => {
    setTimeout(() => resolve([
      {
        category: 'Chassis & Materials',
        items: [
           { label: 'Frame Material', value: 'Aerospace-grade 6061 Aluminum Alloy' },
           { label: 'Welding Tech', value: 'Automated Robotic MIG Welding' }
        ]
      }
    ]), 300);
  });
};
