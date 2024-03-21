// ProfileUpdate.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfileUpdate = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    // Fetch user profile data and populate the form
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/users/profile',{ withCredentials: true });

        const { name, email } = response.data;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        'http://localhost:7000/api/users/profile',
        { name, email, password },
        { withCredentials: true }
      );
      
      localStorage.setItem('userInfo',JSON.stringify(response.data));
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  const handleLogout=async()=>{
    try {
      const response = await axios.post('http://localhost:7000/api/users/logout', 
      {}, 
      {withCredentials:true});
      
      localStorage.removeItem("userInfo");
      navigate("/home")
     console.log(response);
      console.log("Logout");
    } catch (error) {
      console.error('Error logout:', error);
    }
  }
  return (
    <div>
      <h2>Update Profile</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button className='update-button' onClick={handleUpdateProfile}>Update Profile</button>
      <button  className="logout-button"onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfileUpdate;
