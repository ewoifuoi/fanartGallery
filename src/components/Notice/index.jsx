import React, { useState, useRef, useEffect } from 'react';
import './Notice.css'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/modules/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notice = (props, ref) => {


    useImperativeHandle(ref, () => ({
        checkClick : (event)=>{
            if(event.target.closest('.drop_box2')) return false;
            else return true;
        }
    }));

    return (
        <div>
           <div className={`drop_box2 ${props.show==true?'show2':''}`} >
                <div className="drop_menu2">
                    <div className="p-1"></div>

                    <div className="drop_title2">
                        <div className="p-1"></div>
                        
                        <div className="p-1"></div>
                        
                    </div>
                    
                    <div className='drop_sub_title2'>
                        <div className="ps-4"></div>
                        <div className='ps-4'></div>
                        
                        <div className="ps-5"></div>
                        
                    </div>

                    
                    
                </div>
           </div>
        </div>
    )
}

export default forwardRef(Notice);