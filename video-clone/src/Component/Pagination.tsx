// Pagination.tsx
import React from 'react';

interface Props {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        Previous
      </button>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
