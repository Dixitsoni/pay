import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Success() {
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { state } = useLocation()

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");

    if (!token) {
      setError("Invalid payment link");
      setLoading(false);
      return;
    }

    const confirmPayment = async () => {
      try {
        const res = await fetch(`https://invoice-ujyy.vercel.app/api/payments/confirm/${token}`, {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) setError(data.message || "Payment could not be confirmed");
        else setInvoice(data.invoice);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    confirmPayment();
  }, []);

  if (loading) return <p>Processing payment…</p>;
  if (error) return <h2>{error}</h2>;

  return (
    <div className="success-page">
      <h1>Payment Successful</h1>
      <p>Invoice #{invoice._id} paid successfully. Amount: ₹{invoice.totalAmount}</p>
    </div>
  );
}
