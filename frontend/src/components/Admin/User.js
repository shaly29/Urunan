import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Change this value to adjust number of users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('${process.env.REACT_APP_BACKEND_URL}/api/v1/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...editingUser, ...formData };
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/${editingUser._id}`, updatedUser);
      setUsers(users.map(user => user._id === editingUser._id ? updatedUser : user));
      setEditingUser(null);
      setFormData({
        name: '',
        email: ''
      });
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Logic for pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='row'>
      <div className="col-12 col-md-2">
        <Sidebar />
      </div>
      <div className="col-12 col-md-10">
        <h2 className='details'>User List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button className='sec-btn' onClick={() => handleEdit(user)}>Edit</button>
                  <button className='sec-btn' onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <ul className="pagination">
            {[...Array(Math.ceil(users.length / usersPerPage)).keys()].map(number => (
              <li key={number} className="page-item">
                <button onClick={() => paginate(number + 1)} className="page-link">
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {editingUser && (
          <div className="modal">
            <form onSubmit={handleSubmit}>
              <h3>Edit User</h3>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <button className='sec-btn' type="submit">Save</button>
              <button className='sec-btn' type="button" onClick={() => setEditingUser(null)}>Cancel</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
