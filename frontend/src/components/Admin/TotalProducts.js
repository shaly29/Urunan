import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalProducts = () => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/products');
        const total = response.data.products.length;
        setTotalProducts(total);
      } catch (error) {
        console.error('Error fetching total products:', error);
      }
    };

    fetchTotalProducts();
  }, []);

  return (
    <div>
      <h2>Total Products: {totalProducts}</h2>
    </div>
  );
};

export default TotalProducts;
