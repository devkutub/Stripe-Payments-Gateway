import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
  const [product, setProduct] = useState({
    name: "React from FB",
    price: 899,
    productBy: "facebook"
  });

  const makePayment = token => {
    const body = {
      token,
      product
    };
    const headers = {
      "Content-Type": "application/json"
    };

    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log(status);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StripeCheckout
          stripeKey="pk_test_5vM8xucEMaMSPbKBWi8SpbQh00sOuybkz4"
          token={makePayment}
          name="Buy React"
          shippingAddress
          billingAddress
        >
          <button className="btn btn-success rounded btn-lg">
            Buy React in {product.price} Rupee
          </button>
        </StripeCheckout>
      </header>
    </div>
  );
}

export default App;
