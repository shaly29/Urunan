// #58643B
// #572C2C
// #6D3A43
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

const UpdateProduct = ({ product, onUpdate, onClose }) => {
  const [updatedProductData, setUpdatedProductData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    category: product.category,
    seller: product.seller,
    image: product.image // If you're not updating the image, you can retain the existing image
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProductData({
      ...updatedProductData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:7000/api/v1/product/${product._id}`, updatedProductData);
      onUpdate(updatedProductData);
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Update Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="name" value={updatedProductData.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Price:</label>
            <input type="text" name="price" value={updatedProductData.price} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={updatedProductData.description} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input type="text" name="category" value={updatedProductData.category} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Seller:</label>
            <input type="text" name="seller" value={updatedProductData.seller} onChange={handleChange} required />
          </div>
          <button type="submit" className="sec-btn">Update Product</button>
        </form>
      </div>
    </div>
  );
};

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/products');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/product/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateClick = (product) => {
    setShowUpdateModal(true);
    setSelectedProduct(product);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedProduct(null);
  };

  const updateProduct = (updatedProductData) => {
    setProducts(products.map(product => product._id === selectedProduct._id ? updatedProductData : product));
  };

  return (
    <div className='row'>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        {/* <AdminNavbar/> */}
        <h2 className='details'>Product List</h2>
        {showUpdateModal && selectedProduct && (
          <UpdateProduct product={selectedProduct} onUpdate={updateProduct} onClose={handleCloseUpdateModal} />
        )}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td style={{maxWidth:'35px'}}>{product.name}</td>
                <td style={{maxWidth:'25px'}}>{product.price}</td>
                <td style={{maxWidth:"40px"}}>{product.description}</td>
                <td style={{maxWidth:"80px"}}>
                  {product.image && product.image.url ? <img src={product.image.url} style={{maxWidth:'80px', maxHeight:'100px'}} alt="Product" /> : 'No Image'}
                </td>
                <td>

                  <button className='sec-btn2' onClick={() => handleUpdateClick(product)}><i className='uil1 uil-edit ' ></i></button>
                  <button className='sec-btn2' onClick={() => deleteProduct(product._id)}><i className='uil1 uil-trash-alt ' ></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
