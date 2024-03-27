import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const AddPart = () => {
  const [partData, setPartData] = useState({
    name: '',

    description: '',
    image: null,
    category: '',
    sellerName: '',
    email: '',
    phoneNumber: '',
    address: '',
    icNo: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setPartData({
        ...partData,
        image: e.target.files[0]
      });
    } else {
      const { name, value } = e.target;
      setPartData({
        ...partData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', partData.name);

      formData.append('description', partData.description);
      formData.append('category', partData.category);
      formData.append('sellerName', partData.sellerName);
      formData.append('email', partData.email);
      formData.append('phoneNumber', partData.phoneNumber);
      formData.append('address', partData.address);
      formData.append('icNo', partData.icNo);
      formData.append('image', partData.image);

      const response = await fetch('${process.env.REACT_APP_BACKEND_URL}/api/v1/part/new', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {

        throw new Error('Failed to add part');
      }
      toast.success("Part added successfully!")
      setSuccessMessage('Part added successfully!');
      setPartData({
        name: '',

        description: '',
        image: null,
        category: '',
        sellerName: '',
        email: '',
        phoneNumber: '',
        address: '',
        icNo: ''
      });
    } catch (error) {
      toast.error("Failed to add part Try Again Please")
      console.error('Error adding part:', error);
    }
  };

  return (
    <div>
      <div className='sec-wp'>
        <div className="container">
          <div className="row ">
            <div className='col-lg-12 ' style={{ marginTop: "200PX" }}>
              <h4 className="h4" style={{ color: '#763B45' }}>
                You can choose whether to sell your parts in their existing condition or to restore them.
                <span />  You will fill out this form, and we will contact you as soon as. </h4>
            </div>

            <div className="col-lg-8 col-md-10 col-sm-12"> {/* Adjust column size for different screen sizes */}
  <div className="wrapper my-5" style={{paddingRight:'20px', paddingLeft:'20px'}}> {/* Adjust padding */}
    {error && <p style={{ color: 'red' }}>{error}</p>}
    {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    <form onSubmit={handleSubmit} className="shadow-lg form">
      <div className="form-group">
        <label htmlFor="name_field"> Parts Name:</label>
        <input type="text" className="form-control" name="name" value={partData.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <select name="category" className="form-control" value={partData.category} onChange={handleChange} required>
          <option value="" >Select category</option>
          <option value="Repair Part">Only Repair the Parts</option>
          <option value="Repair Part and re-sell">Repair the parts and sell to the urunan</option>
        </select>
      </div>
      <div className="form-group">
        <label>Seller Name:</label>
        <input type="text" className="form-control" name="sellerName" value={partData.sellerName} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" className="form-control" name="email" value={partData.email} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Phone Number:</label>
        <input type="tel" className="form-control" name="phoneNumber" value={partData.phoneNumber} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Address:</label>
        <input type="text" className="form-control" name="address" value={partData.address} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>NIC No:</label>
        <input type="text" className="form-control" name="icNo" value={partData.icNo} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label> Product Image:</label>
        <input type="file" className="form-control" name="image" onChange={handleChange} accept="image/*" required />
      </div>
      <div className="form-group">
        <label>Description:</label>
        <textarea name="description" className="form-control" value={partData.description} onChange={handleChange} required />
      </div>
      <button type="submit" id="view_btn" className="sec-btn btn-block py-3">Submit</button> {/* Make button full width */}
    </form>
  </div>
</div>

            <div className='col-lg-4 ' style={{ marginTop: "300px" }}>

              <div className="faq-box">
                <h4 className="h4-title" style={{ color: '#763B45 ' }}>If Any Emerency?</h4>
                <p className='card-text'> You can contact with urunan via  WhatsApp by scanning your WhatsApp QR code.</p>
                <Link to="/scan"  >


                  <a href="scan" className="sec-btn" style={{ margin: '  0 43px 30px', background: "green", color: 'white' }}><i className="uil uil-whatsapp" style={{ color: 'white' }}></i>Chat with us</a>
                </Link>

                {/* <Link to={"/scan/"} className='scan-btn ' style={{ margin: ' 0 150px 30px' ,background:"green"}}> </Link> */}

              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPart;
