

// export default ProductForm;
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

const ProductForm = () => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
    category: '',
    seller: '',
    stock: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'stock' ? parseInt(value) : value
    });
  };

  const handleImageChange = (e) => {
    setProductData({
      ...productData,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', productData.name);
      formData.append('price', productData.price);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('seller', productData.seller);
      formData.append('image', productData.image);
      formData.append('stock', productData.stock);
      const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/v1/product/new', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Failed to add product');
      }
      toast.success("Product added successfully!")
      setProductData({
        name: '',
        price: '',
        description: '',
        image: null,
        category: '',
        seller: '',
        stock: ''
      });
    } catch (error) {
      toast.error("Failed to add product. Please try again.")
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="row">
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        {/* <AdminNavbar /> */}
        <div className="wrapper my-5">
          <form onSubmit={handleSubmit} className="shadow-lg form ">
            <div className="form-group">
              <label>Name:</label>
              <input type="text" className="form-control" name="name" value={productData.name} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Price:</label>
              <input type="text" className="form-control" name="price" value={productData.price} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Description:</label>
              <textarea name="description" className="form-control" value={productData.description} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <select name="category" className="form-control" value={productData.category} onChange={handleChange} required>
                <option value="">Select category</option>
                <option value="Honda">Honda</option>
                <option value="Scooter">Scooter</option>
                <option value="Tvs">Tvs</option>
                <option value="Plusure">Plusure</option>
              </select>
            </div>
            <div className="form-group">
              <label>Seller:</label>
              <input type="text" className="form-control" name="seller" value={productData.seller} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="stock_field">Stock:</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
            {/* <Icon icon="uil:image-edit"  style={{color: #bc3838}} /> */}
              <label>Image:</label>
              <input type="file" className="form-control" name="image" onChange={handleImageChange} accept="image/*" required />
            </div>
            <button type="submit" className="sec-btn btn-block py-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
