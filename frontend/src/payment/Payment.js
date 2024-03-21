import React, { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';

const Payment = () => {
  const [product, setProduct] = useState({
    name: "Order payment",
    price: 3000 * 100, // convert price to cents as required by Stripe
    productBy: "Urunan"
  });

  
  const makePayment = async (token) => {
    setProduct({ ...product, token });
    const body = {
      token,
      product
    };
    const headers = {
      'Content-Type': "application/json"
    };

    try {
      const response = await fetch('http://localhost:7000/payment', {
        method: 'POST',
        body: JSON.stringify(body),
        headers
      });
      console.log(response);
      // if (!response.ok) {
      //   throw new Error('Response failed');
      // }

      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <StripeCheckout
        name={product.name}
        amount={product.price}
        currency="inr"
        token={makePayment}
        // stripeKey="pk_test_51OmVkmHGq8hdLEpwCUx8jtkSfhHTkjEM8ASGiTub7o9ntjdjdEOv2MdPSCTwX0No44HmIOx7tf3E7LWb28119hkj004yCpy0HC"


      >
        <button class="payment-button"></button>
      </StripeCheckout>
    </div>
  );
};

export default Payment;