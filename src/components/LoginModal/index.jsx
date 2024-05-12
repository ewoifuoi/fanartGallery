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
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="text" placeholder="手机号" className="login__input " />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="密码" className="login__input" />
                                    </div>

                                    <a href="#" className="login__forgot">忘记密码?</a>

                                    <a href="#" className="login__button submit">登录</a>

                                    <div>
                                        <span className="login__account ">还没有账号 ?</span>
                                        <span className="login__signin submit" id="sign-up" onClick={()=>{setLoginState(1)}}>注册</span>
                                    </div>
                                </form>
                                

                                {/* 注册界面 1 */}
                                <form action="" className={loginState == 1 ? 'login__registre block' : 'login__registre none'} id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    

                                    <div className="send__message__box">
                                        <i className='bx bx-at login__icon'></i>
                                        <input type="text" placeholder="手机号" className="login__input" />
                                        <a className='send__button' onClick={()=>{
                                            
                                        }}>
                                        <svg t="1715503476077" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5593" width="30" height="20"><path d="M504.46 516.953333L76.533333 89.026667A53.073333 53.073333 0 0 1 96 85.333333h832a53.073333 53.073333 0 0 1 19.466667 3.693334L519.54 516.953333a10.666667 10.666667 0 0 1-15.08 0z m473.18-397.753333L549.713333 547.126667a53.333333 53.333333 0 0 1-75.426666 0L46.36 119.2A53.073333 53.073333 0 0 0 42.666667 138.666667v661.333333a53.393333 53.393333 0 0 0 53.333333 53.333333h501.333333v-85.333333a64 64 0 0 1-45.253333-109.253333l149.333333-149.333334a64 64 0 0 1 90.506667 0l149.333333 149.333334A64 64 0 0 1 896 768v85.333333h32a53.393333 53.393333 0 0 0 53.333333-53.333333V138.666667a53.073333 53.073333 0 0 0-3.693333-19.466667z m-66.553333 569.713333l-149.333334-149.333333a21.333333 21.333333 0 0 0-30.173333 0l-149.333333 149.333333A21.333333 21.333333 0 0 0 597.333333 725.333333h42.666667v234.666667a21.333333 21.333333 0 0 0 21.333333 21.333333h170.666667a21.333333 21.333333 0 0 0 21.333333-21.333333v-234.666667h42.666667a21.333333 21.333333 0 0 0 15.086667-36.42z" fill="#ffffff" p-id="5594"></path></svg>
                                        </a>
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="验证码" className="login__input" />
                                    </div>

                                    <div className="p-3">
                                        
                                    </div>

                                    <a href="#" className="login__button submit" onClick={()=>{

                                        // 输入邮箱后的校验
                                        
                                        setLoginState(2);
                                    }}>下一步</a>

                                    <div>
                                        <span className="login__account">已有账号 ?</span>
                                        <span className="login__signup submit" id="sign-in" onClick={()=>{setLoginState(0)}}>登录</span>
                                    </div>
                                </form>

                                {/* 注册界面 2 */}
                                <form action="" className={loginState == 2 ? 'login__registre block' : 'login__registre none'} id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="用户名" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="密码" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="确认密码" className="login__input" />
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
        </>
    )
}

export default LoginModal;