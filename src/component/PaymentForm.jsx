import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { validatePaymentLink, createStripeCheckout } from "../api/payment";


export default function PayInvoice() {
  const { token } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await validatePaymentLink(token);
        console.log(data)
        if (data.message) throw new Error(data.message);
        setInvoice(data.invoice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const handlePay = async () => {
    const data = await createStripeCheckout(token);
    if (data.url) {
      window.location.href = data.url;
    }
  };

  if (loading) return <h3>Checking payment link...</h3>;
  if (error) return <Expired message={error} />;

  return (
    <div style={styles.card}>
      <h2>Invoice Payment</h2>
      <p><b>Invoice ID:</b> {invoice._id}</p>
      <p><b>Amount:</b> ₹{invoice.totalAmount}</p>

      <button onClick={handlePay} style={styles.btn}>
        Pay Now
      </button>
    </div>
  );
}

function Expired({ message }) {
  return (
    <div style={styles.card}>
      <h2>Payment Link Invalid</h2>
      <p>{message}</p>
    </div>
  );
}

const styles = {
  card: {
    maxWidth: 420,
    margin: "80px auto",
    padding: 24,
    borderRadius: 8,
    boxShadow: "0 4px 20px rgba(0,0,0,.1)",
    textAlign: "center"
  },
  btn: {
    padding: "12px 20px",
    background: "#5469d4",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer"
  }
};
