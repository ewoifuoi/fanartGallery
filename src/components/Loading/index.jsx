import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './loading.css'

const Loading = () =>{
    return (
        <div>
            <div className='p-3'></div>
            <div className='d-flex justify-content-center'>
                <div className="loader">
                    <svg className="spinner" width="70px" height="70px" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
                        <circle className="path" fill="none" strokeWidth="10" strokeLinecap="round" cx="44" cy="44" r="30"></circle>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Loading;