import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({ currentPage, onPageChange }) => {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between mt-4 px-4">
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
      >
        <FaAngleLeft /><span>{currentPage+1}</span>
      </button>
      <button
        className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-blue-500 transition-colors duration-300 flex items-center justify-center"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === 9}
      ><span>{currentPage+1}{"/10"}</span>
        
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Pagination;
