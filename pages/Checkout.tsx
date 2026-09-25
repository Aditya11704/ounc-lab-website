import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [shippingAddress, setShippingAddress] = useState<any>(null);
  const [rawAddress, setRawAddress] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const orderSummary = {
    name: "Flip - Non Electric",
    price: 29999,
    preOrderFee: 2000,
    delivery: "March 2027"
  };

  useEffect(() => {
    const fetchCheckoutData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { navigate('/signin'); return; }
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('shipping_address')
        .eq('id', user.id)
        .single();

      if (profile && profile.shipping_address) {
        setRawAddress(profile.shipping_address);
        try { setShippingAddress(JSON.parse(profile.shipping_address)); } 
        catch (e) { console.error("Invalid Address JSON"); }
      }
      setLoading(false);
    };
    fetchCheckoutData();
  }, [navigate]);

  const handlePayment = async () => {
    if (!rawAddress) {
      alert("Please add a shipping address first.");
      return;
    }
    setPlacingOrder(true);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      alert('Failed to load Razorpay SDK. Check your internet connection.');
      setPlacingOrder(false);
      return;
    }

    try {
      const amountInPaise = orderSummary.preOrderFee * 100;
      
      // Call the newly deployed Edge Function
      const { data: orderResponse, error: functionError } = await supabase.functions.invoke('razorpay-create-order', {
        body: { amount: amountInPaise }
      });

      // Check if the backend sent back a specific error string
      if (orderResponse && orderResponse.error) {
        throw new Error(`Backend Error: ${orderResponse.error}`);
      }

      if (functionError || !orderResponse || !orderResponse.id) {
        console.error("Invoke Error Details:", functionError || orderResponse);
        throw new Error("Could not initialize secure payment. Check the console for details.");
      }

      console.log("Razorpay Key ID:", import.meta.env.VITE_RAZORPAY_KEY_ID);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // <--- REPLACE THIS WITH YOUR LIVE KEY ID
        amount: orderResponse.amount, 
        currency: orderResponse.currency,
        order_id: orderResponse.id,
        name: 'Ounc Labs Inc.',
        description: 'Pre-Order: Flip Non-Electric',
        image: 'https://qqddkrhpvqzbuhkhgjus.supabase.co/storage/v1/object/public/assets/logo.svg', 
        handler: async function (paymentResponse: any) {
          
          try {
            // 1. Save Transaction
            const { data: txData, error: txError } = await supabase
              .from('transactions')
              .insert([{
                user_id: user.id,
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                amount: orderSummary.preOrderFee,
                status: 'Success'
              }]).select().single();

            if (txError) throw txError;

            // 2. Save Order
            const { data: orderData, error: orderError } = await supabase
              .from('orders')
              .insert([{
                user_id: user.id,
                total_amount: orderSummary.price,
                shipping_address: rawAddress,
                status: 'Pending' 
              }]).select().single();

            if (orderError) throw orderError;

            // 3. Update User Profile Profile widget
            await supabase
              .from('profiles')
              .update({ 
                current_order_id: orderData.id,
                transaction_id: txData.id,
                tracking_number: 'PENDING_ASSIGNMENT'
              })
              .eq('id', user.id);

            setPlacingOrder(false);
            navigate('/profile');

          } catch (err) {
            console.error("Database Update Failed post-payment:", err);
            alert("Payment succeeded, but we had trouble saving your order. Please contact support.");
            setPlacingOrder(false);
          }
        },
        prefill: {
          name: shippingAddress?.fullName || user.user_metadata?.first_name || '',
          email: user.email,
          contact: shippingAddress?.contactNumber || user.user_metadata?.phone || ''
        },
        theme: { color: '#000000' },
        modal: {
          ondismiss: function () {
            setPlacingOrder(false);
          }
        }
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.on('payment.failed', function (paymentResponse: any) {
        alert(`Payment Failed: ${paymentResponse.error.description}`);
        setPlacingOrder(false);
      });
      
      paymentObject.open();

    } catch (error: any) {
      console.error("Checkout Catch Block:", error);
      alert(error.message || "Checkout error. Please try again.");
      setPlacingOrder(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading Checkout...</div>;

  return (
    <main className="flex-grow bg-[#F5F5F5] min-h-[85vh] py-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        <h1 className="text-4xl font-black italic uppercase font-display text-black mb-12">
          Secure Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-7 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">1. Shipping Address</h2>
                <Link to="/edit-address?type=shipping" className="text-xs font-bold text-[#0ea5e9] hover:underline uppercase">
                  {shippingAddress ? 'Change' : 'Add Address'}
                </Link>
              </div>

              {shippingAddress ? (
                <div className="text-sm font-medium text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-2xl border border-gray-100">
                  <span className="font-bold text-black text-base">{shippingAddress.fullName}</span><br/>
                  {shippingAddress.contactNumber}<br/><br/>
                  {shippingAddress.houseNo}, {shippingAddress.area}<br/>
                  {shippingAddress.landmark && <>{shippingAddress.landmark}<br/></>}
                  {shippingAddress.city}, {shippingAddress.state} {shippingAddress.pincode}<br/>
                  {shippingAddress.country}
                </div>
              ) : (
                <div className="text-center py-8 bg-red-50 rounded-2xl border border-red-100">
                  <span className="material-symbols-outlined text-red-400 mb-2 text-3xl">location_off</span>
                  <p className="text-sm text-red-600 font-bold mb-4">No shipping address found</p>
                  <Link to="/edit-address?type=shipping" className="bg-black text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors">
                    Add Address to Continue
                  </Link>
                </div>
              )}
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold mb-6">2. Payment Method</h2>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 flex items-center gap-4">
                 <span className="material-symbols-outlined text-3xl text-gray-400">security</span>
                 <div>
                    <p className="font-bold text-sm">Secure Payment via Razorpay</p>
                    <p className="text-xs text-gray-500 mt-1">UPI, Credit/Debit Cards, and Netbanking supported.</p>
                 </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="font-bold text-black">{orderSummary.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Delivery: {orderSummary.delivery}</p>
                </div>
                <p className="font-bold">₹{orderSummary.price.toLocaleString()}</p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium">₹{orderSummary.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm">Pre-Order Fee Due Today</span>
                  <span className="text-xl font-black">₹{orderSummary.preOrderFee.toLocaleString()}</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-2 leading-tight">
                  The remaining balance of ₹{(orderSummary.price - orderSummary.preOrderFee).toLocaleString()} will be collected closer to the delivery date.
                </p>
              </div>

              <button 
                onClick={handlePayment}
                disabled={!shippingAddress || placingOrder}
                className="w-full bg-[#3395ff] text-white py-4 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#207de0] disabled:opacity-50 transition-colors shadow-lg shadow-[#3395ff]/20 flex items-center justify-center gap-2"
              >
                {placingOrder ? 'Initializing...' : 'Pay with Razorpay'}
                {!placingOrder && <span className="material-symbols-outlined text-sm">lock</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Checkout;