import { useEffect, useState } from "react";
import Checkout from "./component/PaymentForm";
import { Route, Routes } from "react-router-dom";
import Success from "./component/Success";

function App() {
  const [clientSecret, setClientSecret] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/payments/create-payment-intent", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  if (!clientSecret) {
    return <p>Loading checkout...</p>;
  }

  return (
    <Routes>
      <Route path="/" element={<Checkout clientSecret={clientSecret} />} />
      <Route path="/success" element={<Success />} />
    </Routes>
  )
}

export default App;
