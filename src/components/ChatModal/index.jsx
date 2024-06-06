import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';


import Alerts from '../Alerts';
import axios from 'axios';
import sha from 'sha256';
import EmailAnimation from '../../animations/Email/index.jsx';
import { useDispatch } from 'react-redux';
import './ChatModal.css'

const ChatModal = (props) => {

    const alertRef = useRef(null);

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (((!e.target.closest('.upload-container1')))) {
            
            props.onHide();
        }
    };

    return (
        <div>
            <Modal
                {...props}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={props.onHide}
                
            >
                {/* 提示消息列表 */}
                <Alerts ref={alertRef}/>

                <Modal.Body onClick={handleModalBodyClick} draggable="false" >

                <div className='chat-container' style={{height:'580px', width:'860px', backgroundColor:'#F4F4F4'}}>
                        <div className='p-4' style={{fontSize:'25px', fontWeight:'bold', color:'#333'}}>私信</div>
                        <div className='d-flex justify-content-center  ms-5' style={{width:'90%', height:'80%'}}>
                            <div className='d-flex justify-content-center align-items-center' style={{width:'380px', height:'420px'}}>
                                
                               
                            </div>
                            <div style={{width:'30px'}}></div>
                            
                        </div>
                    </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ChatModal;