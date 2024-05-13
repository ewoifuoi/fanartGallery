import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

import './assets/css/styles.css'
import Alerts from '../Alerts';

 

const LoginModal = (props) => {



    // 登录模态框状态 
    // 0 : 登录界面
    // 1 : 注册界面 : 使用 邮箱 注册还是 QQ 注册
    const [loginState, setLoginState] = useState(0);

    // 用户登录表单
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const alertRef = useRef(null);

    // 使用 useEffect 来监听状态的变化 : 用于判断当前是登录还是注册
    useEffect(() => {
        // 在状态变化时触发父组件传递的事件处理函数
        if(props.modalstate == 1) {
            setLoginState(0);
        }
        else if(props.modalstate == 2) {
            setLoginState(1);
        }
    }, [props.modalstate]);


    // 处理点击模态框内容以外的区域关闭模态框
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if ((!e.target.closest('.login__forms') && !e.target.closest('.login__img')) || (!(e.target.closest('.login__registre') || e.target.closest('.signin__registre')) && e.target.closest('.login__forms'))) {
            props.onHide();
        }
    };

    // 登录时校验信息合法性
    const LoginValidation = (e) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailPattern.test(loginEmail)) {
            alertRef.current.showAlert({type:'danger', msg:'请输入正确邮箱地址'})
            return false;
        }
        return true;
    }



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
                <Alerts ref={alertRef}/>
                <Modal.Body onClick={handleModalBodyClick}>
                    <div className="login">
                        <div className="login__content">
                            <div className="login__img">
                                <img src="/images/img-login.svg" alt="" />
                            </div>
                            <div className="login__forms">

                                {/* 登录界面 */}
                                <form action="" className={loginState == 0 ? 'login__registre block' : 'login__registre none'} id="login-in">
                                    <h1 className="login__title">登录</h1>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="text" placeholder="邮箱" className="login__input " onChange={(e)=>setLoginEmail(e.target.value)} />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="密码" className="login__input" onChange={(e)=>{setLoginPassword(e.target.value)}} />
                                    </div>

                                    <a href="#" className="login__forgot">忘记密码?</a>

                                    <a href="#" className="login__button submit" onClick={()=>{

                                     // 登录逻辑

                                        // 校验输入合法性
                                        if(LoginValidation()) {
                                            
                                        }



                                    }}>登录</a>

                                    <div>
                                        <span className="login__account ">还没有账号 ?</span>
                                        <span className="login__signin submit" id="sign-up" onClick={()=>{setLoginState(1)}}>注册</span>
                                    </div>
                                </form>
                                

                                
                                

                                {/* 注册界面 1 */}
                                <form action="" className={loginState == 1 ? 'signin__registre block' : 'signin__registre none'} id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="邮箱" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="昵称" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="password" placeholder="密码" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="password" placeholder="确认密码" className="login__input" />
                                    </div>

                                    <div className="p-3">
                                        
                                    </div>

                                    <a href="#" className="login__button submit">发送验证邮件</a>

                                    <div>
                                        <span className="login__account">已有账号 ?</span>
                                        <span className="login__signup submit" id="sign-in" onClick={()=>{setLoginState(0)}}>登录</span>
                                    </div>
                                </form>
                                
                            </div>
                        </div>
                    </div>



                </Modal.Body>

            </Modal>
           
            
        </div>
    )
}

export default LoginModal;