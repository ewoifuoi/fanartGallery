import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

import './assets/css/styles.css'



const LoginModal = (props) => {


    // 登录模态框状态 
    // 0 : 登录界面
    // 1 : 注册界面 : 使用 邮箱 注册还是 QQ 注册
    const [loginState, setLoginState] = useState(0);

    // 使用 useEffect 来监听状态的变化 : 用于判断当前是登录还是注册
    useEffect(() => {
        // 在状态变化时触发父组件传递的事件处理函数
        if(props.modalState == 1) {
            setLoginState(0);
        }
        else if(props.modalState == 2) {
            setLoginState(1);
        }
    }, [props.modalState]);


    // 处理点击模态框内容以外的区域关闭模态框
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if ((!e.target.closest('.login__forms') && !e.target.closest('.login__img')) || (!e.target.closest('.login__registre') && e.target.closest('.login__forms'))) {
            props.onHide();
        }
    };
    return (
        <>
            <Modal
                {...props}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                onHide={props.onHide}
            >
                
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
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" className="login__input" />
                                    </div>

                                    <a href="#" className="login__forgot">忘记密码?</a>

                                    <a href="#" className="login__button submit">登录</a>

                                    <div>
                                        <span className="login__account ">还没有账号 ?</span>
                                        <span className="login__signin submit" id="sign-up" onClick={()=>{setLoginState(1)}}>注册</span>
                                    </div>
                                </form>
                                

                                {/* 注册界面 */}
                                <form action="" className={loginState == 1 ? 'login__registre block' : 'login__registre none'} id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="用户名" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-at login__icon'></i>
                                        <input type="text" placeholder="邮箱" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="密码" className="login__input" />
                                    </div>

                                    <a href="#" className="login__button submit">注册</a>

                                    <div>
                                        <span className="login__account">已有账号 ?</span>
                                        <span className="login__signup submit" id="sign-in" onClick={()=>{setLoginState(0)}}>登录</span>
                                    </div>

                                    {/* <div className="login__social">
                                        <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                                        <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                                        <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                                    </div> */}
                                </form>
                                
                            </div>
                        </div>
                    </div>



                </Modal.Body>

            </Modal>
        </>
    )
}

export default LoginModal;