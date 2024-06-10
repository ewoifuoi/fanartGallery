import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';


import Alerts from '../Alerts';
import axios from 'axios';
import sha from 'sha256';
import EmailAnimation from '../../animations/Email/index.jsx';
import { useDispatch, useSelector } from 'react-redux';
import './ChatModal.css'

const ChatModal = (props) => {

    const alertRef = useRef(null);

    const socket = useRef(null);
    const modalState = useSelector((state)=>state.modal.modalState);
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        if(modalState==4) {
            setShow(true);
        }
    }, [modalState])

    useEffect(() => {
        if(show) {
            socket.current = new WebSocket('ws://124.221.8.18:8080/chat/ws');
    
            socket.current.onopen = () => {
            console.log("连接建立成功")
            };
        
            socket.current.onmessage = (event) => {
            const data = event.data;
            setMessages((prevMessages) => [...prevMessages, data]);
            };
        
            socket.current.onerror = (error) => {
              alertRef.current.showAlert({ type: 'danger', msg: 'WebSocket错误' });
            };
        
            socket.current.onclose = () => {
                console.log("连接关闭成功")
            };
        
        }
        else {
            if (socket.current) {
                socket.current.close();
            }
            
        }
      }, [show]);

      const handleSendMessage = () => {
        if (message.trim() !== '') {
          socket.current.send(message);
          setMessages((prevMessages) => [...prevMessages, `你: ${message}`]);
          setMessage('');
        }
      };
    
      const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSendMessage();
        }
      };
    

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (((!e.target.closest('.chat-container')))) {
            setShow(false);
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

                <div className='chat-container' style={{ height: '580px', width: '860px', backgroundColor: '#F4F4F4' }}>
                    <div className='p-4' style={{ fontSize: '25px', fontWeight: 'bold', color: '#333' }}>私信</div>
                    <div className='d-flex justify-content-center ms-5' style={{ width: '90%', height: '80%' }}>
                    <div className='d-flex flex-column justify-content-center align-items-center' style={{ width: '380px', height: '420px', overflowY: 'scroll', border: '1px solid #ccc', borderRadius: '10px', padding: '10px', backgroundColor: '#fff' }}>
                        {messages.map((msg, index) => (
                        <div key={index} className='message-bubble' style={{ backgroundColor: '#E1FFC7', padding: '10px', borderRadius: '10px', marginBottom: '10px', maxWidth: '70%', alignSelf: msg.startsWith('你:') ? 'flex-end' : 'flex-start' }}>
                            {msg}
                        </div>
                        ))}
                    </div>
                    <div style={{ width: '30px' }}></div>
                    <div className='d-flex flex-column justify-content-end' style={{ width: '380px', height: '420px' }}>
                        <input
                        type="text"
                        className="form-control"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="输入消息并按Enter键发送..."
                        />
                        <Button variant="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
                        发送
                        </Button>
                    </div>
                    </div>
                </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ChatModal;