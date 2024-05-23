import React, { useState, useRef, useEffect } from 'react';
import './AvatarDropdown.css'
const AvatarDropdown = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
           <div className="drop_box">
                <div className="drop_menu">
                    <div className="p-2"></div>
                    <div className="drop_item">
                        <img src="" alt="" />
                    </div>
                </div>
           </div>
        </>
    )
}

export default AvatarDropdown;