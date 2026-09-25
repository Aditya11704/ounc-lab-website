import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", 
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const emptyAddress = {
  country: 'India', fullName: '', contactNumber: '', pincode: '', houseNo: '', area: '', landmark: '', city: '', state: ''
};

const EditAddress: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'shipping';
  
  const [user, setUser] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [shippingData, setShippingData] = useState<any>(null);
  const [sameAsShipping, setSameAsShipping] = useState(false);
  const [formData, setFormData] = useState(emptyAddress);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { navigate('/signin'); return; }
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('shipping_address, billing_address')
        .eq('id', user.id)
        .single();

      if (profile) {
        // Save shipping data in memory for the checkbox
        if (profile.shipping_address) {
          try {
            setShippingData(JSON.parse(profile.shipping_address));
          } catch(e) {}
        }

        const existingAddress = type === 'shipping' ? profile.shipping_address : profile.billing_address;
        if (existingAddress) {
          try {
            const parsed = JSON.parse(existingAddress);
            // Only set if it isn't a blank emptyAddress save
            if (parsed.fullName) setFormData(parsed);
          } catch (e) { console.log("Invalid JSON"); }
        }
      }
    };
    fetchUserData();
  }, [navigate, type]);

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSameAsShipping(checked);
    if (checked && shippingData) {
      setFormData(shippingData);
    } else {
      setFormData(emptyAddress);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    // CRITICAL FIX: Force the exact shipping data to copy if checked
    let dataToSave = formData;
    if (type === 'billing' && sameAsShipping && shippingData) {
      dataToSave = shippingData;
    }

    const addressJson = JSON.stringify(dataToSave);
    const updateField = type === 'shipping' ? { shipping_address: addressJson } : { billing_address: addressJson };

    const { error } = await supabase.from('profiles').update(updateField).eq('id', user.id);
    setSaving(false);
    if (!error) navigate('/profile');
    else alert("Failed to save address. Please try again.");
  };

  return (
    <main className="flex-grow bg-[#F5F5F5] min-h-[85vh] py-12 px-4 flex justify-center">
      <div className="bg-white rounded-3xl p-8 md:p-12 w-full max-w-2xl shadow-xl border border-gray-100">
        <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-6">
          <button onClick={() => navigate(-1)} className="size-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
            <span className="material-symbols-outlined text-black">arrow_back</span>
          </button>
          <h1 className="text-2xl font-black uppercase tracking-wide text-black">
            Edit {type === 'shipping' ? 'Shipping' : 'Billing'} Address
          </h1>
        </div>

        {type === 'billing' && (
          <div className="mb-8 pb-6 border-b border-gray-100">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={sameAsShipping}
                onChange={handleCheckbox}
                className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black transition-colors cursor-pointer"
              />
              <span className="text-sm font-bold text-gray-700">Same as Shipping Address</span>
            </label>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Country / Region</label>
              <input type="text" value={formData.country} disabled className="w-full bg-gray-100 text-gray-500 px-4 py-3 rounded-xl border-none font-medium cursor-not-allowed" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Full Name</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Contact Number</label>
              <input type="tel" value={formData.contactNumber} onChange={(e) => setFormData({...formData, contactNumber: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Pincode</label>
              <input type="text" value={formData.pincode} onChange={(e) => setFormData({...formData, pincode: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Flat, House no., Building</label>
            <input type="text" value={formData.houseNo} onChange={(e) => setFormData({...formData, houseNo: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Area, Street, Sector</label>
            <input type="text" value={formData.area} onChange={(e) => setFormData({...formData, area: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase">Landmark</label>
            <input type="text" value={formData.landmark} onChange={(e) => setFormData({...formData, landmark: e.target.value})} disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">City</label>
              <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all disabled:opacity-60" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">State</label>
              <div className="relative">
                <select value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} required disabled={sameAsShipping} className="w-full bg-[#EEEEEE] text-black px-4 py-3 rounded-xl border-none outline-none focus:ring-2 focus:ring-black transition-all appearance-none disabled:opacity-60">
                  <option value="" disabled>Select a state</option>
                  {INDIAN_STATES.map(state => <option key={state} value={state}>{state}</option>)}
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 material-symbols-outlined text-sm">expand_more</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={saving} className="w-full bg-black text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 disabled:opacity-50 transition-colors shadow-lg shadow-black/20">
              {saving ? 'Saving...' : 'Save Address'}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditAddress;