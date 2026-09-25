import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Get the requested amount from your React frontend
    const { amount } = await req.json()

    // 2. Load your secure Razorpay keys
    const keyId = Deno.env.get('RAZORPAY_KEY_ID')
    const keySecret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!keyId || !keySecret) {
      throw new Error("Missing Razorpay API keys in environment variables")
    }

    // 3. Ask Razorpay to create a secure Order ID
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${btoa(`${keyId}:${keySecret}`)}`
      },
      body: JSON.stringify({
        amount: amount, // Amount is in paise (e.g., 200000 for ₹2000)
        currency: 'INR',
        receipt: `receipt_${crypto.randomUUID()}`
      })
    })

    const orderData = await response.json()

    if (!response.ok) {
      throw new Error(orderData.error?.description || "Failed to create order")
    }

    // 4. Send the secure Order ID back to React
    return new Response(JSON.stringify(orderData), { 
      headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
    })

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})