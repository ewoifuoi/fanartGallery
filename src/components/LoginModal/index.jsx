import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'

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
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>用户名</Form.Label>
                            <Form.Control type="text" placeholder="输入用户名" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>密码</Form.Label>
                            <Form.Control type="password" placeholder="输入密码" />
                        </Form.Group>
                    </Form>
                    <Button variant="primary">登录</Button>
                </Modal.Body>
                
            </Modal>
        </>
    )
}

export default LoginModal;