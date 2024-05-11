import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

import './assets/css/styles.css'

import './assets/js/main.js'

const LoginModal = (props) => {

    // 处理点击模态框内容以外的区域关闭模态框
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (!e.target.closest('.login__registre')) {
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
                    {/* <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control type="text" placeholder="输入用户名" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control type="password" placeholder="输入密码" />
                        </Form.Group>
                    </Form>
                    <Button variant="primary">登录</Button> */}
                    
                    <div className="login">
                        <div className="login__content">
                            <div className="login__img">
                                <img src="/images/img-login.svg" alt="" />
                            </div>
                            <div className="login__forms">
                                <form action="" className="login__registre" id="login-in">
                                    <h1 className="login__title">登录</h1>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" className="login__input" />
                                    </div>

                                    <a href="#" className="login__forgot">Forgot password?</a>

                                    <a href="#" className="login__button">登录</a>

                                    <div>
                                        <span className="login__account">Don't have an Account ?</span>
                                        <span className="login__signin" id="sign-up">注册</span>
                                    </div>
                                </form>

                                <form action="" className="login__create none" id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-at login__icon'></i>
                                        <input type="text" placeholder="Email" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" className="login__input" />
                                    </div>

                                    <a href="#" className="login__button">注册</a>

                                    <div>
                                        <span className="login__account">Already have an Account ?</span>
                                        <span className="login__signup" id="sign-in">登录</span>
                                    </div>

                                    <div className="login__social">
                                        <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                                        <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                                        <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                    <script src="assets/js/main.js"></script>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default LoginModal;