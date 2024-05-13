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

    // 用户注册表单
    const [signinEmail, setSigninEmail] = useState('');
    const [signinName, setSigninName] = useState('');
    const [signinPassword, setSigninPassword] = useState('');
    const [signinConfirmPassword, setSigninConfirmPassword] = useState('');
    
    // 提示消息列表的引用 <Alerts/> 组件
    const alertRef = useRef(null);

    // 异常代码 : 用于控制界面异常显示的状态转移 
    //    其中相反数代表获得焦点

    // 0 : 正常界面
    // 1 : 请输入正确的邮箱地址
    // 2 : 请输入密码

    // 3 : 请输入正确的注册邮箱地址
    // 4 : 请输入昵称
    // 5 : 请输入密码
    // 6 : 请再次输入密码

    const [errorCode, setErrorCode] = useState(0);


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


    // 关闭模态框时重置所有状态
    const resetAllState = () => {
        setErrorCode(0);
        setLoginEmail('');
        setLoginPassword('');
        setSigninConfirmPassword('');
        setSigninEmail('');
        setSigninName('');
        setSigninPassword('');

    }

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (errorCode >= 0 && ((!e.target.closest('.login__forms') && !e.target.closest('.login__img')) || (!(e.target.closest('.login__registre') || e.target.closest('.signin__registre')) && e.target.closest('.login__forms')))) {
            
            resetAllState();
            props.onHide();
        }
    };

    // 登录时校验信息合法性
    const LoginValidation = () => {

        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com+$/;

        if(!emailPattern.test(loginEmail)) {
            alertRef.current.showAlert({type:'danger', msg:'请输入正确的邮箱地址'})
            setErrorCode(1);
            return false;
        }
        else if(loginPassword.trim()==='') {
            alertRef.current.showAlert({type:'danger', msg:'请输入密码'})
            setErrorCode(2);
            return false;
        }
        else return true;
    }

    // 注册时校验信息合法性
    const RegisterValidation = () => {

        const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.com+$/;
        const passwordPattern = /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]+$/;
        
        if(!emailPattern.test(signinEmail)) {
            alertRef.current.showAlert({type:'danger', msg:'请输入正确的邮箱地址'})
            setErrorCode(3);
            return false;
        }
        else if(signinName.trim()==='') {
            alertRef.current.showAlert({type:'danger', msg:'请输入昵称'})
            setErrorCode(4);
            return false;
        }
        else if(signinPassword.trim()==='') {
            alertRef.current.showAlert({type:'danger', msg:'请输入密码'})
            setErrorCode(5);
            return false;
        }
        else if(signinPassword.length < 8) {
            alertRef.current.showAlert({type:'danger', msg:'密码长度至少为8位'})
            setErrorCode(5);
            return false;
        }
        else if(!passwordPattern.test(signinPassword)){
            alertRef.current.showAlert({type:'danger', msg:'密码必须包含字母和数字'})
            setErrorCode(5);
            return false;
        }
        else if(signinConfirmPassword.trim() =='') {
            alertRef.current.showAlert({type:'danger', msg:'请再次输入密码'})
            setErrorCode(6);
            return false;
        }
        else if(signinConfirmPassword !== signinPassword) {
            alertRef.current.showAlert({type:'danger', msg:'两次输入密码不一致'})
            setErrorCode(6);
            return false;
        }
        else {
            return true;
        }

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
                {/* 提示消息列表 */}
                <Alerts ref={alertRef}/>

                <Modal.Body onClick={handleModalBodyClick} draggable="false" >
                    <div className="login">
                        <div className="login__content">
                            <div className="login__img">
                                <img src="/images/img-login.svg" alt="" />
                            </div>
                            <div className="login__forms">

                                {/* 登录界面 */}
                                <form action="" className={loginState == 0 ? 'login__registre block' : 'login__registre none'} id="login-in">
                                    <h1 className="login__title">登录</h1>

                                    {/* 登录邮箱 */}
                                    <div id='loginEmail' className={`login__box border border-4  
                                        ${errorCode==-1 ? 'border-primary-subtle' : errorCode==1 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-1)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input maxLength={25} type="text" placeholder="邮箱" className="login__input " onChange={(e)=>setLoginEmail(e.target.value)} />
                                    </div>

                                    {/* 登录密码 */}
                                    <div className={`login__box border border-4
                                        ${errorCode==-2 ? 'border-primary-subtle' : errorCode==2 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-2)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-lock-alt login__icon'></i>
                                        <input  maxLength={20} type="password" placeholder="密码" className="login__input" onChange={(e)=>{setLoginPassword(e.target.value)}} />
                                    </div>

                                    <a href="#" className="login__forgot">忘记密码?</a>

                                    <a href="#" className="login__button submit" onClick={()=>{

                                     // 登录逻辑

                                        // 校验输入合法性
                                        if(LoginValidation()) {
                                            setErrorCode(0); // 重置异常代码

                                            // 登录成功
                                            alertRef.current.showAlert({type:'success', msg:'登录成功'})
                                        }

                                    }}>登录</a>

                                    <div>
                                        <span className="login__account ">还没有账号 ?</span>
                                        <span className="login__signin submit" id="sign-up" onClick={()=>{setErrorCode(0);setLoginState(1)}}>注册</span>
                                    </div>
                                </form>
                                
                                {/* 注册界面 1 */}
                                <form action="" className={loginState == 1 ? 'signin__registre block' : 'signin__registre none'} id="login-up">
                                    <h1 className="login__title">创建账号</h1>

                                    {/* 注册邮箱 */}
                                    <div className={`login__box border border-4
                                        ${errorCode==-3 ? 'border-primary-subtle' : errorCode==3 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-3)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-user login__icon'></i>
                                        <input maxLength={25} type="text" placeholder="邮箱" className="login__input" onChange={(e)=>{setSigninEmail(e.target.value)}}/>
                                    </div>

                                    {/* 注册昵称 */}
                                    <div className={`login__box border border-4
                                        ${errorCode==-4 ? 'border-primary-subtle' : errorCode==4 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-4)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-user login__icon'></i>
                                        <input  maxLength={20} type="text" placeholder="昵称" className="login__input" onChange={(e)=>{setSigninName(e.target.value)}}/>
                                    </div>

                                    {/* 注册密码 */}
                                    <div className={`login__box border border-4
                                        ${errorCode==-5 ? 'border-primary-subtle' : errorCode==5 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-5)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-user login__icon'></i>
                                        <input  maxLength={20} type="password" placeholder="密码" className="login__input" onChange={(e)=>{setSigninPassword(e.target.value)}}/>
                                    </div>

                                    {/* 确认密码 */}
                                    <div className={`login__box border border-4
                                        ${errorCode==-6 ? 'border-primary-subtle' : errorCode==6 ? 'border-danger-subtle':'border-white'} `}
                                        onFocus={()=>{setErrorCode(-6)}}
                                        onBlur={()=>{setErrorCode(0)}}>
                                        <i className='bx bx-user login__icon'></i>
                                        <input  maxLength={20} type="password" placeholder="确认密码" className="login__input" onChange={(e)=>{setSigninConfirmPassword(e.target.value)}}/>
                                    </div>

                                    <div className="p-3">
                                        
                                    </div>

                                    <a href="#" className="login__button submit" onClick={()=>{

                                        // 注册逻辑

                                        if(RegisterValidation()) {

                                            setErrorCode(0); // 重置异常代码
                                            // 注册成功
                                        }


                                    }}>发送验证邮件</a>

                                    <div>
                                        <span className="login__account">已有账号 ?</span>
                                        <span className="login__signup submit" id="sign-in" onClick={()=>{setErrorCode(0);setLoginState(0)}}>登录</span>
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