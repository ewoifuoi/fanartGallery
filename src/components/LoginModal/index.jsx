import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

import './assets/css/styles.css'
import './assets/img/img-login.svg'
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

                    <div class="login">
                        <div class="login__content">
                            <div class="login__img">
                                <img src="assets/img/img-login.svg" alt="" />
                            </div>
                            <div class="login__forms">
                                <form action="" class="login__registre" id="login-in">
                                    <h1 class="login__title">Sign In</h1>

                                    <div class="login__box">
                                        <i class='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" class="login__input" />
                                    </div>

                                    <div class="login__box">
                                        <i class='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" class="login__input" />
                                    </div>

                                    <a href="#" class="login__forgot">Forgot password?</a>

                                    <a href="#" class="login__button">Sign In</a>

                                    <div>
                                        <span class="login__account">Don't have an Account ?</span>
                                        <span class="login__signin" id="sign-up">Sign Up</span>
                                    </div>
                                </form>

                                <form action="" class="login__create none" id="login-up">
                                    <h1 class="login__title">Create Account</h1>

                                    <div class="login__box">
                                        <i class='bx bx-user login__icon'></i>
                                        <input type="text" placeholder="Username" class="login__input" />
                                    </div>

                                    <div class="login__box">
                                        <i class='bx bx-at login__icon'></i>
                                        <input type="text" placeholder="Email" class="login__input" />
                                    </div>

                                    <div class="login__box">
                                        <i class='bx bx-lock-alt login__icon'></i>
                                        <input type="password" placeholder="Password" class="login__input" />
                                    </div>

                                    <a href="#" class="login__button">Sign Up</a>

                                    <div>
                                        <span class="login__account">Already have an Account ?</span>
                                        <span class="login__signup" id="sign-in">Sign In</span>
                                    </div>

                                    <div class="login__social">
                                        <a href="#" class="login__social-icon"><i class='bx bxl-facebook' ></i></a>
                                        <a href="#" class="login__social-icon"><i class='bx bxl-twitter' ></i></a>
                                        <a href="#" class="login__social-icon"><i class='bx bxl-google' ></i></a>
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