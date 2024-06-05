import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './UploadModal.css'


import SliderCaptcha, {
    Status
  } from 'rc-slider-captcha';


import Alerts from '../Alerts';
import axios from 'axios';
import sha from 'sha256';
import EmailAnimation from '../../animations/Email/index.jsx';
import { useDispatch } from 'react-redux';

const UploadModal = (props) => {

    const alertRef = useRef(null);

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (((!e.target.closest('.upload-container')))) {
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
                    <div className='upload-container' style={{height:'580px', width:'800px', backgroundColor:'#F4F4F4'}}>
                        
                    </div>

                </Modal.Body>

            </Modal>
           
            
        </div>
    )
}

export default UploadModal;