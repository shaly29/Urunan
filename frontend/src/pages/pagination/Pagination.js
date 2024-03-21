// Pagination.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../pagination/Pagination.css'; // Import the CSS file for styling

const Pagination = ({ currentPage, totalPages }) => {
  const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="pagination">
      {range(1, totalPages).map(page => (
        <Link
          to={`?page=${page}`}
          key={page}
          className={currentPage === page ? 'active' : ''}
        >
          {page}
        </Link>
      ))}
    </div>
  );
};

export default Pagination;
