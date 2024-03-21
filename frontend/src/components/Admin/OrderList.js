import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Admin/Sidebar';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, [deleteSuccess]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:7000/api/v1/order');
      setOrders(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/order/${orderId}`);
      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order) => {
    // Set the editingOrder state to the selected order
    setEditingOrder(order);
    // Initialize updatedData with the properties of the selected order
    setUpdatedData({ ...order });
  };

  const handleUpdateOrder = async () => {
    try {
      // Make a PUT request to update the order
      await axios.put(`http://localhost:7000/api/v1/order/${editingOrder._id}`, updatedData);
      // Refetch orders to update the list
      fetchOrders();
      // Clear the editingOrder state
      setEditingOrder(null);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div>
      <div className='row'>
        <div className='col-md-2'>
          <Sidebar />
        </div>
        <div className='col-md-10'>
          <h2>Order List</h2>
          {deleteSuccess && <div className="success-message">Order deleted successfully</div>}
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Cash on Delivery</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                  <td>{order.userId}</td>
                  <td>{order.cashOnDelivery ? 'Yes' : 'No'}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <button onClick={() => handleEditOrder(order)}>Edit</button>
                    <button onClick={() => handleDeleteOrder(order._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Edit Order Modal */}
          {editingOrder && (
            <div className="modal">
              <div className="modal-content">
                <h2>Edit Order</h2>
                <label>Amount:</label>
                <input
                  type="text"
                  value={updatedData.amount}
                  onChange={(e) => setUpdatedData({ ...updatedData, amount: e.target.value })}
                />
                {/* Add input fields for other order properties */}
                <button onClick={handleUpdateOrder}>Update</button>
                <button onClick={() => setEditingOrder(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
