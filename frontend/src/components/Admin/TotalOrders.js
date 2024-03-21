import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalOrdersComponent = () => {
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/orders');
        const { totalAmount, orders } = response.data;
        setTotalOrders(orders.length); // Assuming orders is an array of orders
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Total Orders: {totalOrders}</h2>
    </div>
  );
};

export default TotalOrdersComponent;
