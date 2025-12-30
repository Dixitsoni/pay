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
        const res = await fetch(`https://invoice-fuo7.vercel.app/api/payments/confirm/${token}`, {
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
    <div className="success-wrapper">
      <div className="success-card">
        <div className="success-icon">
          ✓
        </div>

        <h1 className="success-title">Payment Successful</h1>

        <p className="success-subtitle">
          Thank you! Your payment has been processed successfully.
        </p>

        <div className="success-details">
          <div className="detail-row">
            <span>Invoice ID</span>
            <strong>#{invoice._id}</strong>
          </div>
          <div className="detail-row">
            <span>Amount Paid</span>
            <strong>₹{invoice.totalAmount}</strong>
          </div>
        </div>

        <p className="success-note">
          A payment confirmation has been sent to your email.
        </p>
      </div>
    </div>
  );
}
