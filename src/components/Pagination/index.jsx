import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handleClick = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <span className="page-link" onClick={() => handleClick(i)}>
                        {i}
                    </span>
                </li>
            );
        }
        return pageNumbers;
    };

    return (
        <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <span className="page-link" onClick={() => handleClick(currentPage - 1)}>
                    Previous
                </span>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <span className="page-link" onClick={() => handleClick(currentPage + 1)}>
                    Next
                </span>
            </li>
        </ul>
    );
};

export default Pagination;
