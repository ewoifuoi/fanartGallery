import React, { useState, useRef, useEffect } from 'react';
import './AvatarDropdown.css'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useSelector } from 'react-redux';
const AvatarDropdown = (props,ref) => {

    const imageSrc = useSelector((state)=>state.auth.avatar_url);
    const username = useSelector((state)=>state.auth.username);
    const email = useSelector((state)=>state.auth.email);
    // 使用 useImperativeHandle 暴露 closeDropdown 方法给父组件
    useImperativeHandle(ref, () => ({
        checkClick : (event)=>{
            if(event.target.closest('.drop_box')) return false;
            else return true;
        }
    }));

    return (
        <div>
           <div className={`drop_box ${props.show==true?'show':''}`} >
                <div className="drop_menu">
                    <div className="p-2"></div>
                    <div className="drop_item">
                        <div className="p-1"></div>
                        <div>
                            <img className='drop_item_img' src={imageSrc} alt="/images/default.png" />
                            <span style={{top:'70px',left:'60px'}} className="position-absolute translate-middle p-1 bg-success border border-light rounded-circle">
                            </span>
                        </div>
                        <div className="p-1"></div>
                        <div>
                            <div style={{fontSize:'18px'}}>{username}</div>
                            <div style={{fontSize:'12px',color:'grey'}}>{email}</div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default forwardRef(AvatarDropdown);