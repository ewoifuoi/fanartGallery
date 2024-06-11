import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';


import Alerts from '../Alerts';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import './ChatModal.css'
import Loading from '../Loading/index.jsx';


const ChatModal = (props) => {

    const alertRef = useRef(null);

    const socket = useRef(null);
    const modalState = useSelector((state)=>state.modal.modalState);
    const [show, setShow] = useState(false);

    const [data, setData] = useState([]);

    const [messages, setMessages]  = useState([
        {
            'user':'from',
            'content':'content'
        },
        {
            'user':'to',
            'content':'content'
        },
        {
            'user':'from',
            'content':'content'
        },
        {
            'user':'to',
            'content':'content'
        }
    ]);

    const [userPanel, setUserPanel] = useState([]);

    const userAvatar = useSelector((state)=>state.auth.avatar_url);

    const [loading, setLoading] = useState(false);

    const [currentUserName, setCurrentUserName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [currentAvatar, setCurrentAvatar] = useState('');

    const messagesEndRef = useRef(null);

    const [input, setInput] = useState('');

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      };

    useEffect(() => {
        // const interval = setInterval(() => {
        //     addMessage({"user":"from","content":"New message arrived!"});
        // }, 1000);

        // return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const getMessageList = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/chat/list`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                setData(response.data)
                setLoading(false);
                
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
    }

    const send = async () => {
        addMessage({"user":"to","content":`${input}`});
        setInput('');
    }


    const render = async () => {
        
        let elements = [];
        for (let i = 0; i < data.length; i++) {
            const user = data[i];
            
            console.log(data[i])
            elements.push(
                <div className="chat-user-card" key={i} onClick={()=>{
                    setCurrentUserName(user.name);
                    setCurrentUserId(user.uid);
                    setCurrentAvatar(user.avatar);
                }}>
                    <div style={{width:'10px'}}></div>
                    <img draggable="false" className='chat-user-card-avatar' src={user.avatar} alt="" />
                    <div style={{width:'10px'}}></div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='chat-user-card-name'>{user.name}</div>
                    </div>
                    
                    
                </div>
            );
        }
        setUserPanel(elements);
    }

    useEffect(()=>{
        render();
    }, [loading])

    useEffect(()=>{
        if(modalState==4) {
            setShow(true);
            setLoading(true);
        }
    }, [modalState])

    useEffect(() => {
        if(show) {
            socket.current = new WebSocket('ws://124.221.8.18:8080/chat/ws');
    
            socket.current.onopen = () => {
                console.log("连接建立成功")
            };

            console.log("!")
            getMessageList();

            render();
        
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
                
                    <div className='d-flex justify-content-center ms-1' style={{ width: '100%', height: '100%' }}>

                        <div style={{width:'30%', height:'100%'}}>
                            <div className='p-4' style={{ fontSize: '25px', fontWeight: 'bold', color: '#333' }}>私信</div>

                            {/* 用户列表 */}
                            {!loading && <div className='' style={{width:'100%', height:'82%'}}>
                                {userPanel}
                            </div>}

                            {loading && 
                            <Loading/>}

                        </div>

                        <div style={{width:'2px', height:'100%', backgroundColor:'#C9C9C999'}}></div>
                            
                        <div style={{width:'70%', height:'100%'}}>

                            {/* 聊天窗口顶部栏 */}
                            <div style={{width:'100%', height:'10%'}}>
                                <div className='d-flex align-items-center' style={{height:'100%'}}>
                                    <div className='chat-top-name'>{currentUserName}</div>
                                </div>
                            </div>

                            <div style={{width:'99%', height:'2px', backgroundColor:'#C9C9C999'}}></div>
                            
                            {/* 聊天信息 */}
                            <div className='d-flex justify-content-center align-items-center' style={{width:'99%', height:'79%'}}>
                                <div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px 0%" data-bs-smooth-scroll="true" className="chat-scrollspy rounded-2 overflow-auto" tabIndex="0" style={{ maxHeight: '430px' }}>
                                
                                {/* 内容 */}
                                {messages.map((message, index) => (

                                    <div key={index} className="message-bubble">
                                        {message.user=='from'?(
                                            <div className='d-flex align-items-center'>
                                                <div style={{width:'20px'}}></div>
                                                <img className='chat-user-avatar' src={currentAvatar} alt="" />
                                                <div className='chat-message-bubble'>
                                                    {message.content}
                                                </div>
                                            </div>
                                        ):(
                                            <div className='d-flex align-items-center justify-content-end'>

                                                <div className='chat-message-send-bubble'>
                                                    {message.content}
                                                </div>
                                                <img className='chat-user-avatar' src={userAvatar} alt="" />
                                                <div style={{width:'20px'}}></div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    ))}
                                <div ref={messagesEndRef} />

                                </div>
                            </div>

                            {/* 输入面板 */}
                            <div className='d-flex' style={{width:'99%', height:'10%'}}>

                                <div style={{width:'15px'}}></div>

                                <div className='d-flex justify-content-center align-items-center'>
                                    <div className='chat-button d-flex justify-content-center align-items-center'>
                                        <svg filter="url(#shadow1)"  t="1718002226418" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4319" width="26" height="26">
                                            <defs>
                                                <filter id="shadow1" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feDropShadow dx="8" dy="4" stdDeviation="5" floodColor="rgba(0, 0, 0, 0.1)"/>
                                                </filter>
                                            </defs>
                                            <path d="M910.469565 184.765217l-111.304348 0c-2.226087-6.678261-13.356522-33.391304-20.034783-44.521739-15.582609-33.391304-26.713043-48.973913-60.104348-48.973913L307.2 91.269565c-33.391304 0-46.747826 13.356522-66.782609 62.330435-4.452174 11.130435-11.130435 26.713043-13.356522 31.165217L113.530435 184.765217C51.2 184.765217 0 235.965217 0 298.295652l0 518.678261c0 62.330435 51.2 113.530435 113.530435 113.530435l796.93913 0c62.330435 0 113.530435-51.2 113.530435-113.530435L1024 298.295652C1024 235.965217 972.8 184.765217 910.469565 184.765217L910.469565 184.765217zM42.295652 298.295652c0-40.069565 31.165217-71.234783 71.234783-71.234783l122.434783 0c15.582609 0 20.034783-6.678261 24.486957-13.356522 6.678261-13.356522 8.904348-22.26087 13.356522-31.165217 2.226087-4.452174 4.452174-11.130435 6.678261-15.582609 0 0 0-2.226087 2.226087-4.452174 4.452174-8.904348 11.130435-26.713043 26.713043-26.713043l411.826087 0c13.356522 0 17.808696 8.904348 22.26087 17.808696l0 2.226087c2.226087 6.678261 6.678261 13.356522 11.130435 22.26087 6.678261 15.582609 13.356522 31.165217 15.582609 35.617391 4.452174 8.904348 11.130435 13.356522 20.034783 13.356522l124.66087 0c40.069565 0 71.234783 31.165217 71.234783 71.234783l0 518.678261c0 40.069565-31.165217 71.234783-71.234783 71.234783L113.530435 888.208696c-40.069565 0-71.234783-31.165217-71.234783-71.234783L42.295652 298.295652 42.295652 298.295652 42.295652 298.295652zM42.295652 298.295652M512 790.26087c129.113043 0 233.73913-104.626087 233.73913-233.73913 0-129.113043-104.626087-233.73913-233.73913-233.73913s-233.73913 104.626087-233.73913 233.73913C280.486957 687.86087 382.886957 790.26087 512 790.26087L512 790.26087zM512 365.078261c106.852174 0 191.443478 86.817391 191.443478 191.443478 0 106.852174-86.817391 191.443478-191.443478 191.443478s-191.443478-86.817391-191.443478-191.443478C320.556522 451.895652 405.147826 365.078261 512 365.078261L512 365.078261zM512 365.078261M812.521739 367.304348l51.2 0c11.130435 0 20.034783-8.904348 20.034783-20.034783 0-11.130435-8.904348-20.034783-20.034783-20.034783l-51.2 0c-11.130435 0-20.034783 8.904348-20.034783 20.034783C790.26087 358.4 801.391304 367.304348 812.521739 367.304348L812.521739 367.304348zM812.521739 367.304348" fill="#2c2c2c" p-id="4320"></path>
                                        </svg>
                                    </div>
                                </div>
                                
                                <div className='d-flex chat-input-box'>
                                    <div style={{width:'10px'}}></div>
                                    <input onChange={(e)=>{
                                        setInput(e.target.value);
                                    }} style={{color:'#333',textJustify:'top'}} className='chat-input' type="text" placeholder='Message'/>
                                    <div style={{width:'20px'}}></div>
                                    
                                    <div className='chat-button d-flex justify-content-center align-items-center'>
                                        <div className='d-flex justify-content-center align-items-center'>
                                            <svg t="1718002956943" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5776" width="28" height="28"><path d="M512 953.81818174c244.02272695 0 441.81818174-197.79545479 441.81818174-441.81818174C953.81818174 267.97727305 756.02272695 70.18181826 512 70.18181826 267.97727305 70.18181826 70.18181826 267.97727305 70.18181826 512c0 244.02272695 197.79545479 441.81818174 441.81818174 441.81818174z m0-65.45454522a376.36363653 376.36363653 0 1 1 0-752.72727305 376.36363653 376.36363653 0 0 1 0 752.72727305z" p-id="5777" fill="#2c2c2c"></path><path d="M296 671.50454521a305.46818174 305.46818174 0 0 0 432 0 32.72727305 32.72727305 0 1 0-46.30909131-46.26818173 240.01363652 240.01363652 0 0 1-339.38181738 0 32.72727305 32.72727305 0 1 0-46.30909131 46.26818173z" p-id="5778" fill="#2c2c2c"></path><path d="M358.59090869 426.78636347m-51.13636348 0a51.13636347 51.13636347 0 1 0 102.27272784 0 51.13636347 51.13636347 0 1 0-102.27272784 0Z" p-id="5779" fill="#2c2c2c"></path><path d="M665.40909131 426.78636347m-51.13636436 0a51.13636347 51.13636347 0 1 0 102.27272784 0 51.13636347 51.13636347 0 1 0-102.27272784 0Z" p-id="5780" fill="#2c2c2c"></path></svg>
                                        </div>
                                    </div>

                                    <div style={{width:'5px'}}></div>
                                </div>

                                <div className='d-flex justify-content-center align-items-center' onClick={()=>{
                                    send();
                                }}>
                                    <div className='chat-button d-flex justify-content-center align-items-center'>
                                        <svg filter="url(#shadow2)" t="1718011423875" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22474" width="24" height="24">
                                            <defs>
                                                <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
                                                    <feDropShadow dx="4" dy="4" stdDeviation="6" floodColor="#52376122"/>
                                                </filter>
                                            </defs>
                                            <path d="M0 1024l106.496-474.112 588.8-36.864-588.8-39.936-106.496-473.088 1024 512z" p-id="22475" fill="#BB9ED0"></path>
                                        </svg>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>                    
                </div>

                </Modal.Body>

            </Modal>
        </div>
    )
}

export default ChatModal;