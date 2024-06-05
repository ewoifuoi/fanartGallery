import React, { useState, useRef, useEffect } from 'react';
import './Notice.css'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/modules/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Notice = (props, ref) => {

    const [noticeState, setNoticeState] = useState(0);

    useImperativeHandle(ref, () => ({
        checkClick : (event)=>{
            if(event.target.closest('.drop_box2')) return false;
            else return true;
        }
    }));

    return (
        <div>
            <div className={`drop_box2 ${props.show ? 'show2' : ''}`}>
                <div className="drop_menu2">
                    <div style={{ height: '6px' }}></div>
                    <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '40px' }}>
                        <div className='d-flex justify-content-center align-items-center' style={{ width: '250px', height: '30px' }}>
                            <div style={{ width: '23px', height: '23px' }}>
                                <svg onClick={()=>{
                                    setNoticeState(0);
                                }} t="1717597028409" className={`icon  ${noticeState==0?'icon_button_selected':'icon_button'}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4280" width="21" height="21"><path d="M187.392 70.656q28.672 0 48.64 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t47.616-19.456l54.272 0zM889.856 70.656q27.648 0 47.616 19.456t19.968 48.128l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-28.672 19.968-48.128t48.64-19.456l437.248 0zM187.392 389.12q28.672 0 48.64 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t47.616-19.968l54.272 0zM889.856 389.12q27.648 0 47.616 19.968t19.968 48.64l0 52.224q0 27.648-19.968 47.616t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-47.616l0-52.224q0-28.672 19.968-48.64t48.64-19.968l437.248 0zM187.392 708.608q28.672 0 48.64 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-48.64 19.968l-54.272 0q-27.648 0-47.616-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t47.616-19.968l54.272 0zM889.856 708.608q27.648 0 47.616 19.968t19.968 47.616l0 52.224q0 28.672-19.968 48.64t-47.616 19.968l-437.248 0q-28.672 0-48.64-19.968t-19.968-48.64l0-52.224q0-27.648 19.968-47.616t48.64-19.968l437.248 0z" p-id="4281"></path></svg>
                            </div>
                            <div style={{ width: '60px' }}></div>
                            <div style={{ width: '1.2px', height: '25px', backgroundColor: '#8491A538' }}></div>
                            <div style={{ width: '60px' }}></div>
                            <div style={{ width: '23px', height: '23px' }}>
                                <svg onClick={()=>{
                                    setNoticeState(1);
                                }} t="1717597104270" className={`icon  ${noticeState==1?'icon_button_selected':'icon_button'}`} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5450" width="21" height="21"><path d="M1024 352c0 337-512 592-512 592S0 690 0 352C0 201.8 121.8 80 272 80c101.3 0 189.7 55.4 236.5 137.6 1.5 2.7 5.4 2.7 6.9 0C562.3 135.4 650.7 80 752 80c150.2 0 272 121.8 272 272z" p-id="5451"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div style={{ height: '5px' }}></div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div style={{ width: '280px', height: '0.9px', backgroundColor: '#8491A538' }}></div>
                    </div>


                    {noticeState == 0 &&<div id="navbar-example2" style={{ position: 'relative' }}>
                        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2 overflow-auto" tabIndex="0" style={{ maxHeight: '330px' }}>
                            
                            {/* 内容 */}

                        </div>
                    </div>}

                    {noticeState == 1 &&<div id="navbar-example2" style={{ position: 'relative' }}>
                        <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" className="scrollspy-example bg-body-tertiary p-3 rounded-2 overflow-auto" tabIndex="0" style={{ maxHeight: '330px' }}>
                            
                            {/* 内容 */}

                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default forwardRef(Notice);