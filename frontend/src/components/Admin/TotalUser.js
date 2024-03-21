import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalUser = () => {
  const [totalUsers, setTotalUsers] = useState(null);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/v1/users'); // Adjust the URL to match your backend route
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  return (
    <div>
      <h2>Total Users</h2>
      <p>{totalUsers} </p>
    </div>
  );
};

export default TotalUser;
