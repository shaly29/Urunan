import React, { useState } from 'react';

const OrderForm = ({ onSubmit }) => {
  const [deliveryInfo, setDeliveryInfo] = useState({
    address: '',
    district: '',
    phoneNo: ''
  });
  const [orderItems, setOrderItems] = useState([]);
  
  const handleDeliveryInfoChange = (e) => {
    const { name, value } = e.target;
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
  };

  const handleOrderItemChange = (e, index) => {
    const { name, value } = e.target;
    const newOrderItems = [...orderItems];
    newOrderItems[index][name] = value;
    setOrderItems(newOrderItems);
  };

  const handleAddOrderItem = () => {
    setOrderItems([...orderItems, { name: '', quantity: '', image: '', price: '', product: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { deliveryInfo, orderItems };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Address:</label>
        <input type="text" name="address" value={deliveryInfo.address} onChange={handleDeliveryInfoChange} required />
      </div>
      <div>
        <label>District:</label>
        <input type="text" name="district" value={deliveryInfo.district} onChange={handleDeliveryInfoChange} required />
      </div>
      <div>
        <label>Phone Number:</label>
        <input type="text" name="phoneNo" value={deliveryInfo.phoneNo} onChange={handleDeliveryInfoChange} required />
      </div>
      {orderItems.map((item, index) => (
        <div key={index}>
          <label>Item Name:</label>
          <input type="text" name="name" value={item.name} onChange={(e) => handleOrderItemChange(e, index)} required />
          <label>Quantity:</label>
          <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleOrderItemChange(e, index)} required />
          <label>Image:</label>
          <input type="text" name="image" value={item.image} onChange={(e) => handleOrderItemChange(e, index)} required />
          <label>Price:</label>
          <input type="number" name="price" value={item.price} onChange={(e) => handleOrderItemChange(e, index)} required />
          <label>Product ID:</label>
          <input type="text" name="product" value={item.product} onChange={(e) => handleOrderItemChange(e, index)} required />
        </div>
      ))}
      <button type="button" onClick={handleAddOrderItem}>Add Item</button>
      <button type="submit">Place Order</button>
    </form>
  );
};

export default OrderForm;
