// import { EmbeddedCheckoutProvider, EmbeddedCheckout } from
//   "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// function Checkout({ clientSecret }) {
//   return (
//     <EmbeddedCheckoutProvider
//       stripe={stripePromise}
//       options={{ clientSecret }}
//     >
//       <EmbeddedCheckout />
//     </EmbeddedCheckoutProvider>
//   );
// }

// export default Checkout;


import { useState } from "react";

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    // 1️⃣ Call backend to create session
    const res = await fetch("https://invoice-ujyy.vercel.app/api/payments/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "user@example.com", // or get from your login system
        name: "John Doe",
      }),
    });

    const data = await res.json();

    // 2️⃣ Redirect to Stripe Checkout
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout session creation failed.");
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Complete Your Payment</h2>
      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          borderRadius: "8px",
          backgroundColor: "#5469d4",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        {loading ? "Redirecting…" : "Pay Now"}
      </button>
      <p style={{ marginTop: "20px", fontSize: "14px", color: "#555" }}>
        You will see Google Pay / Apple Pay if available
      </p>
    </div>
  );
}
