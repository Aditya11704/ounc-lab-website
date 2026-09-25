import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import jsPDF from 'jspdf';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [isEditingGst, setIsEditingGst] = useState(false);
  const [gstNumber, setGstNumber] = useState('');
  const [savingGst, setSavingGst] = useState(false);
  
  const [profileData, setProfileData] = useState({
    shipping: '',
    billing: '',
    currentOrderId: '',
    trackingNumber: '',
    transactionId: ''
  });

  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) { navigate('/signin'); return; }
      setUser(user);

      const { data: profile } = await supabase
        .from('profiles')
        .select('shipping_address, billing_address, gst_number, current_order_id, tracking_number, transaction_id')
        .eq('id', user.id)
        .single();

      if (profile) {
        setProfileData({ 
          shipping: profile.shipping_address || '', 
          billing: profile.billing_address || '',
          currentOrderId: profile.current_order_id || '',
          trackingNumber: profile.tracking_number || '',
          transactionId: profile.transaction_id || ''
        });
        setGstNumber(profile.gst_number || '');

        if (profile.current_order_id) {
          const { data: orderData } = await supabase
            .from('orders')
            .select('*')
            .eq('id', profile.current_order_id)
            .single();
          setOrderDetails(orderData);
        }

        if (profile.transaction_id) {
          const { data: txData } = await supabase
            .from('transactions')
            .select('*')
            .eq('id', profile.transaction_id)
            .single();
          setTransactionDetails(txData);
        }
      }
      setLoading(false);
    };
    fetchUserData();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/signin');
  };

  const handleSaveGst = async () => {
    setSavingGst(true);
    await supabase.from('profiles').update({ gst_number: gstNumber }).eq('id', user.id);
    setSavingGst(false);
    setIsEditingGst(false);
  };

  const handleDownloadInvoice = () => {
    if (!orderDetails || !transactionDetails) return;
    setGeneratingPdf(true);

    try {
      const doc = new jsPDF();
      let address: any = {};
      try {
        address = JSON.parse(profileData.shipping);
      } catch (e) {
        console.error("Could not parse shipping address");
      }

      doc.setFontSize(22);
      doc.setFont("helvetica", "bold");
      doc.text("OUNC LABS INC.", 20, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Move Without Limits", 20, 26);
      doc.text("support@ounclabs.com", 20, 32);

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("TAX INVOICE / RECEIPT", 130, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Date: ${new Date(transactionDetails.created_at).toLocaleDateString()}`, 130, 28);
      doc.text(`Order ID: ${orderDetails.id.substring(0, 8).toUpperCase()}`, 130, 34);
      doc.text(`Payment ID: ${transactionDetails.razorpay_payment_id}`, 130, 40);

      doc.line(20, 45, 190, 45);

      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Billed To:", 20, 55);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`${address.fullName || user.user_metadata?.first_name || 'Customer'}`, 20, 62);
      if (address.houseNo) doc.text(`${address.houseNo}, ${address.area}`, 20, 68);
      if (address.city) doc.text(`${address.city}, ${address.state} ${address.pincode}`, 20, 74);
      if (address.contactNumber) doc.text(`${address.contactNumber}`, 20, 80);

      doc.setFillColor(240, 240, 240);
      doc.rect(20, 90, 170, 10, 'F');
      doc.setFont("helvetica", "bold");
      doc.text("Description", 25, 97);
      doc.text("Total", 170, 97);

      doc.setFont("helvetica", "normal");
      doc.text("Flip - Non Electric (Pre-Order Deposit)", 25, 110);
      doc.text(`Rs. ${transactionDetails.amount.toLocaleString()}`, 170, 110);

      doc.line(20, 120, 190, 120);
      doc.setFont("helvetica", "bold");
      doc.text("Total Paid:", 135, 130);
      doc.text(`Rs. ${transactionDetails.amount.toLocaleString()}`, 170, 130);

      doc.setFontSize(9);
      doc.setFont("helvetica", "italic");
      doc.text("Thank you for choosing Ounc Labs. Your pre-order is confirmed.", 105, 270, { align: "center" });

      doc.save(`Ounc_Invoice_${transactionDetails.razorpay_payment_id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Could not generate invoice. Please try again later.");
    } finally {
      setGeneratingPdf(false);
    }
  };

  const formatAddress = (addressStr: string) => {
    if (!addressStr) return <span className="text-gray-400 italic">Not provided</span>;
    try {
      const addr = JSON.parse(addressStr);
      if (!addr.fullName || addr.fullName.trim() === '') {
        return <span className="text-gray-400 italic">Not provided</span>;
      }
      return (
        <div className="text-sm font-medium text-gray-700 leading-relaxed">
          <span className="font-bold text-black">{addr.fullName}</span><br/>
          {addr.contactNumber}<br/>
          {addr.houseNo}, {addr.area}<br/>
          {addr.landmark && <>{addr.landmark}<br/></>}
          {addr.city}, {addr.state} {addr.pincode}<br/>
          {addr.country}
        </div>
      );
    } catch (e) {
      return <span className="text-sm text-gray-700">{addressStr}</span>;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <main className="flex-grow bg-[#F5F5F5] min-h-[85vh] py-12 px-6">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h1 className="text-4xl font-black italic uppercase font-display text-black">My Account</h1>
          <button onClick={handleSignOut} className="mt-4 md:mt-0 px-6 py-2 border-2 border-black text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-colors">
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <div className="size-16 bg-gray-200 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-2xl text-gray-500">person</span>
              </div>
              <h2 className="text-xl font-bold mb-1">{user.user_metadata?.first_name || 'User'} {user.user_metadata?.last_name || ''}</h2>
              <p className="text-sm text-gray-500 mb-6">{user.email}</p>
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Account Details</p>
                <p className="text-sm font-medium">Username: <span className="text-gray-500">{user.user_metadata?.username || 'N/A'}</span></p>
                <p className="text-sm font-medium">Phone: <span className="text-gray-500">{user.user_metadata?.phone || 'N/A'}</span></p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Shipping Address</p>
                  <Link to="/edit-address?type=shipping" className="text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full text-black hover:bg-gray-200 transition-colors uppercase">Edit</Link>
                </div>
                {formatAddress(profileData.shipping)}
              </div>
              <hr className="border-gray-100" />
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">Billing Address</p>
                  <Link to="/edit-address?type=billing" className="text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full text-black hover:bg-gray-200 transition-colors uppercase">Edit</Link>
                </div>
                {formatAddress(profileData.billing)}
              </div>
              <hr className="border-gray-100" />
              <div>
                <div className="flex justify-between items-center mb-3">
                  <p className="text-xs font-bold text-gray-400 uppercase">GST Number</p>
                  {!isEditingGst && <button onClick={() => setIsEditingGst(true)} className="text-[10px] font-bold bg-gray-100 px-3 py-1 rounded-full text-black hover:bg-gray-200 transition-colors uppercase">Edit</button>}
                </div>
                {isEditingGst ? (
                  <div className="flex gap-2">
                    <input type="text" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} className="w-full bg-[#EEEEEE] text-black px-3 py-2 rounded-lg border-none outline-none text-sm uppercase" placeholder="Enter GST" />
                    <button onClick={handleSaveGst} disabled={savingGst} className="bg-black text-white px-3 py-2 rounded-lg text-xs font-bold uppercase">{savingGst ? '...' : 'Save'}</button>
                  </div>
                ) : (
                  <p className="text-sm font-medium text-gray-700 uppercase">
                    {gstNumber || <span className="text-gray-400 italic normal-case">Not provided</span>}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            
            {profileData.currentOrderId ? (
              <div className="bg-black text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-[#0ea5e9] mb-1">Active Order</h3>
                      <div className="flex items-baseline gap-3">
                        <p className="text-2xl font-black">Flip - Non Electric</p>
                        <p className="text-sm font-bold text-gray-400">#{profileData.currentOrderId.substring(0,8).toUpperCase()}</p>
                      </div>
                    </div>
                    <span className="bg-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                      Processing
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Order Date</p>
                      <p className="text-sm font-medium tracking-wide">
                        {transactionDetails ? new Date(transactionDetails.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Loading...'}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Order Time</p>
                      <p className="text-sm font-medium tracking-wide">
                        {transactionDetails ? new Date(transactionDetails.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Loading...'}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Razorpay Order ID</p>
                      <p className="text-sm font-medium tracking-wide break-all">
                        {transactionDetails?.razorpay_order_id || <span className="text-gray-500 italic">Pending...</span>}
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                      <p className="text-xs font-bold uppercase text-gray-400 mb-1">Tracking Number</p>
                      <p className="text-sm font-medium tracking-wide">
                        {profileData.trackingNumber || <span className="text-gray-500 italic">Pending Assignment</span>}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleDownloadInvoice}
                    disabled={generatingPdf || !orderDetails || !transactionDetails}
                    className="w-full bg-[#0ea5e9] text-white py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#0284c7] disabled:opacity-50 transition-colors shadow-lg flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">
                      {generatingPdf ? 'hourglass_empty' : 'download'}
                    </span>
                    {generatingPdf ? 'Generating PDF...' : 'Download Invoice'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-full flex flex-col items-center justify-center text-center">
                <span className="material-symbols-outlined text-4xl text-gray-300 mb-3">inventory_2</span>
                <h3 className="font-bold text-gray-600">No active orders</h3>
                <p className="text-sm text-gray-400 mt-1">When you pre-order a bicycle, your tracking details will appear here.</p>
              </div>
            )}

          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;