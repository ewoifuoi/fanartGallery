import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

import './assets/css/styles.css'

import './assets/js/main.js'

const LoginModal = (props) => {
    return (
        <>
            <Modal
                {...props}
                dialogClassName="modal-90w"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        登录
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                    <h1 className="login__title">Sign In</h1>

                                    <div className="login__box">
                                        <i className='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" className="login__input" />
                                    </div>

                                    <div className="login__box">
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" className="login__input" />
                                    </div>

                                    <a href="#" className="login__forgot">Forgot password?</a>

                                    <a href="#" className="login__button">Sign In</a>

                                    <div>
                                        <span className="login__account">Don't have an Account ?</span>
                                        <span className="login__signin" id="sign-up">Sign Up</span>
                                    </div>
                                </form>

                                <form action="" className="login__create none" id="login-up">
                                    <h1 className="login__title">Create Account</h1>

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

                                    <a href="#" className="login__button">Sign Up</a>

                                    <div>
                                        <span className="login__account">Already have an Account ?</span>
                                        <span className="login__signup" id="sign-in">Sign In</span>
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