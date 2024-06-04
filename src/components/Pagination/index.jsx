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
            <div style={{height:'10px',width:'10px'}}></div>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <div className="page-link" onClick={() => handleClick(currentPage - 1)}>
                    <svg t="1717510194023" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4920" width="32" height="32"><path d="M288.3 544.1c0.6 0.8 1.4 1.7 2.1 2.5l360.5 394.9c19.6 21.5 52.9 23 74.4 3.4 21.5-19.6 23-52.9 3.4-74.4L400.4 510.7 729 151.9c19.6-21.4 18.2-54.7-3.3-74.4-21.4-19.6-54.7-18.2-74.4 3.3L290.2 475.1c-18 19.6-18.3 49.1-1.9 69z"  p-id="4921"></path></svg>
                </div>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <span className="page-link" onClick={() => handleClick(currentPage + 1)}>
                    <svg t="1717510240759" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6146" width="32" height="32"><path d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z" p-id="6147"></path></svg>
                </span>
            </li>
            <div style={{height:'10px',width:'10px'}}></div>
        </ul>
    );
};

export default Pagination;
