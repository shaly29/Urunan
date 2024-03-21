import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import AdminNavbar from './AdminNavbar';

function PartsList() {
  const [parts, setParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(9); // Number of parts per page

  useEffect(() => {
    fetchParts();
  }, [currentPage]);

  const fetchParts = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/v1/admin/parts?page=${currentPage}&perPage=${perPage}`);
      setParts(response.data.parts);
    } catch (error) {
      console.error('Error fetching parts:', error);
    }
  };

  const deletePart = async (partId) => {
    try {
      await axios.delete(`http://localhost:7000/api/v1/admin/part/${partId}`);
      fetchParts();
    } catch (error) {
      console.error('Error deleting part:', error);
    }
  };

  const totalPages = Math.ceil(parts.length / perPage);

  return (
    <div className='row'>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        {/* <AdminNavbar/> */}
        <h2 className='details'>Parts List</h2>
        <table>
          <thead>
            <tr>
              <th style={{maxWidth:'95px'}}>Name</th>
              <th style={{maxWidth:'95px'}}>Price</th>
              <th style={{maxWidth:'35px'}}>Description</th>
              <th style={{maxWidth:'55px'}}>Image</th>
              <th style={{maxWidth:'35px'}}>Category</th>
              <th style={{maxWidth:'35px'}}>Seller Name</th>
              <th style={{maxWidth:'35px'}}>Email</th>
              <th style={{maxWidth:'35px'}}>Phone Number</th>
              <th style={{maxWidth:'35px'}}>Address</th>
              <th style={{maxWidth:'35px'}}>IC No</th>
              <th style={{maxWidth:'35px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parts.map(part => (
              <tr key={part._id}>
                <td>{part.name}</td>
                <td>{part.price}</td>
                <td>{part.description}</td>
                <td>{part.image && part.image.url ? <img src={part.image.url} alt="Part" /> : 'No Image'}</td>
                <td>{part.category}</td>
                <td>{part.sellerName}</td>
                <td>{part.email}</td>
                <td>{part.phoneNumber}</td>
                <td>{part.address}</td>
                <td>{part.icNo}</td>
                <td>
                  <button className='sec-btn' onClick={() => deletePart(part._id)}><i className='uil1 uil-trash-alt ' ></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {/* <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <span>{`Page ${currentPage} of ${totalPages}`}</span>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button> */}
        </div>
      </div>
    </div>
  );
}

export default PartsList;
