import React, { useState, useRef, useEffect } from 'react';
import './AvatarDropdown.css'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
const AvatarDropdown = (props,ref) => {

    
    // 使用 useImperativeHandle 暴露 closeDropdown 方法给父组件
    useImperativeHandle(ref, () => ({
        checkClick : (event)=>{
            if(event.target.closest('.drop_box')) return false;
            else return true;
        }
    }));

    return (
        <div >
           {props.show && <div className="drop_box" >
                <div className="drop_menu">
                    <div className="p-2"></div>
                    <div className="drop_item">
                        <img src="" alt="" />
                    </div>
                </div>
           </div>}
        </div>
    )
}

export default forwardRef(AvatarDropdown);