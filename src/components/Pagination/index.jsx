import React, { useEffect, useState } from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [page, setPage] = useState(currentPage);


    useEffect(() => {
        onPageChange(page);
    }, [page, onPageChange]);

    const renderPageNumbers = () => {
        let pageNumbers = [];
        
        if (totalPages <= 10) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                        <span className="page-link" onClick={() => {setPage(i); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                            {i}
                        </span>
                    </li>
                );
            }
        } else if (page < 5) {
            for (let i = 1; i <= 5; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                        <span className="page-link" onClick={() => {setPage(i); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                            {i}
                        </span>
                    </li>
                );
            }
            pageNumbers.push(
                <li key={'dots1'} className='page-item disabled'>
                    <span className='page-link'>...</span>
                </li>
            );
            pageNumbers.push(
                <li key={totalPages - 1} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(totalPages - 1); window.scrollTo({ top:350, behavior: 'smooth' });}}>
                        {totalPages - 1}
                    </span>
                </li>
            );
            pageNumbers.push(
                <li key={totalPages} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(totalPages); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                        {totalPages}
                    </span>
                </li>
            );
        } else if (page > totalPages - 4) {
            pageNumbers.push(
                <li key={1} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(1); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                        {1}
                    </span>
                </li>
            );
            pageNumbers.push(
                <li key={'dots2'} className='page-item disabled'>
                    <span className='page-link'>...</span>
                </li>
            );
            for (let i = totalPages - 4; i <= totalPages; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                        <span className="page-link" onClick={() => {setPage(i); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                            {i}
                        </span>
                    </li>
                );
            }
        } else {
            pageNumbers.push(
                <li key={1} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(1); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                        {1}
                    </span>
                </li>
            );
            pageNumbers.push(
                <li key={'dots3'} className='page-item disabled'>
                    <span className='page-link'>...</span>
                </li>
            );
            for (let i = page - 2; i <= page + 2; i++) {
                pageNumbers.push(
                    <li key={i} className={`page-item ${page === i ? 'active' : ''}`}>
                        <span className="page-link" onClick={() => {setPage(i); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                            {i}
                        </span>
                    </li>
                );
            }
            pageNumbers.push(
                <li key={'dots4'} className='page-item disabled'>
                    <span className='page-link'>...</span>
                </li>
            );
            pageNumbers.push(
                <li key={totalPages - 1} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(totalPages - 1); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                        {totalPages - 1}
                    </span>
                </li>
            );
            pageNumbers.push(
                <li key={totalPages} className={`page-item`}>
                    <span className="page-link" onClick={() => {setPage(totalPages); window.scrollTo({ top: 350, behavior: 'smooth' });}}>
                        {totalPages}
                    </span>
                </li>
            );
        }

        return pageNumbers;
    };

    return (
        <ul className="pagination">
            <div style={{ height: '10px', width: '10px' }}></div>
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <div className="page-link" onClick={() => { if (page > 1) {setPage(page - 1);window.scrollTo({ top: 350, behavior: 'smooth' });} }}>
                    <svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M288.3 544.1c0.6 0.8 1.4 1.7 2.1 2.5l360.5 394.9c19.6 21.5 52.9 23 74.4 3.4 21.5-19.6 23-52.9 3.4-74.4L400.4 510.7 729 151.9c19.6-21.4 18.2-54.7-3.3-74.4-21.4-19.6-54.7-18.2-74.4 3.3L290.2 475.1c-18 19.6-18.3 49.1-1.9 69z"></path></svg>
                </div>
            </li>
            {renderPageNumbers()}
            <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                <span className="page-link" onClick={() => { if (page < totalPages) {setPage(page + 1);window.scrollTo({ top: 350, behavior: 'smooth' });} }}>
                    <svg className="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="32" height="32"><path d="M731.7 475.1L370.6 80.8c-19.7-21.5-53-22.9-74.4-3.3-21.5 19.7-22.9 53-3.3 74.4l328.6 358.8-328.3 359.8c-19.6 21.5-18.1 54.8 3.4 74.4 21.5 19.6 54.8 18.1 74.4-3.4l360.5-394.9c0.7-0.8 1.5-1.7 2.1-2.5 16.4-19.9 16.1-49.4-1.9-69z"></path></svg>
                </span>
            </li>
            <div style={{ height: '10px', width: '10px' }}></div>
        </ul>
    );
};

export default Pagination;
