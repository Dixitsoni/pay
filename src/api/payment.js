const API_BASE = "https://invoice-du4f.vercel.app/api";
// const API_BASE = "http://localhost:5000/api";

export const validatePaymentLink = async (token) => {
  const res = await fetch(`${API_BASE}/payments/validate/${token}`);
  return res.json();
};

export const createStripeCheckout = async (token) => {
  const res = await fetch(`${API_BASE}/payments/create-payment-intent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token })
  });
  return res.json();
};
