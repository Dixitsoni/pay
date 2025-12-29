import { useEffect, useState } from "react";
import Checkout from "./component/PaymentForm";
import { Route, Routes } from "react-router-dom";
import Success from "./component/Success";
import Cancel from "./component/ErrorOrCancel";

function App() {
  return (
    <Routes>
      <Route path="/pay/:token" element={<Checkout /> } />
      <Route path="/success" element={<Success />} />
      <Route path="/cancel" element={<Cancel />} />
    </Routes>
  )
}

export default App;
