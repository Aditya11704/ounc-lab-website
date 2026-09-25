import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
}

serve(async (req) => {
  // 1. CRITICAL: Handle CORS Preflight perfectly
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { amount } = await req.json()

    // 2. Fetch Live Keys
    const keyId = Deno.env.get('RAZORPAY_KEY_ID')
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!keyId || !keySecret) {
      throw new Error("Razorpay keys are missing from Supabase secrets.")
    }

    // 3. Call Razorpay API
    const razorpayRes = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${keyId}:${keySecret}`)}`
      },
      body: JSON.stringify({
        amount: amount, // Amount in paise
        currency: 'INR',
        receipt: `receipt_${crypto.randomUUID()}`
      })
    })

    const orderData = await razorpayRes.json()

    if (!razorpayRes.ok) {
      throw new Error(orderData.error?.description || "Razorpay API error")
    }

    // 4. Return secure Order ID to React
    return new Response(JSON.stringify(orderData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })

  } catch (error: any) {
    console.error("Backend Error:", error.message);
    // Return 400 with exact error message instead of crashing
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400, 
    })
  }
})