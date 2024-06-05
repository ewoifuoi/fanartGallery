import React, { useState, useEffect, createRef, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { Form, Button, Modal } from 'react-bootstrap';
import './LoginModal.css'


import SliderCaptcha, {
    Status
  } from 'rc-slider-captcha';


import './assets/css/styles.css'
import Alerts from '../Alerts';
import axios from 'axios';
import sha from 'sha256';
import EmailAnimation from '../../animations/Email/index.jsx';
import { useDispatch } from 'react-redux';
import { login } from '../../store/modules/auth.jsx';
 

const LoginModal = (props) => {

    const dispatch = useDispatch()

    // 登录模态框状态 
    // 0 : 登录界面
    // 1 : 注册界面 : 使用 邮箱 注册还是 QQ 注册
    // 2 : 注册成功界面
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

    const [signinLoading, setSigninLoading] = useState(false);

    // 异常代码 : 用于控制界面异常显示的状态转移 
    //    其中相反数代表获得焦点

    // 0 : 正常界面
    // 1 : 请输入正确的邮箱地址
    // 2 : 请输入密码

    // 3 : 请输入正确的注册邮箱地址
    // 4 : 请输入昵称
    // 5 : 请输入密码
    // 6 : 请再次输入密码
    // 7 : 请拖动滑块完成人机验证 

    const [errorCode, setErrorCode] = useState(0);

    // 滑动验证组件状态
    const actionRef = useRef(null);

    // 用户点击没有收到邮件的重新发送等待时间
    const [resendWaiting, setResendWaiting] = useState(0);


    // 点击重新发送邮件的倒计时
    useEffect(()=>{
        let timer;
        if(resendWaiting > 0) {
            
            timer = setInterval(()=>{
                setResendWaiting((prevSecond) => prevSecond - 1);
            }, 1000)            
            return ()=> clearInterval(timer);
        }
        else {
            clearInterval(timer); // 清除计时器
        }
    }, [resendWaiting])


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
        setResendWaiting(0);

        // 重置滑动验证模块
        actionRef.current?.refresh()

    }

    

    // 关闭登录模态框 逻辑
    const handleModalBodyClick = (e) => {
        // 检查是否点击了模态框内容以外的区域，并且不是 login__registre 元素
        if (errorCode >= 0 && ((!e.target.closest('.login__forms') && !e.target.closest('.login__img')) || (!(e.target.closest('.login__registre') || e.target.closest('.signin__registre') || e.target.closest('.signin__success')) && e.target.closest('.login__forms')))) {
            
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
        
        if(actionRef.current.status != Status.Success) {
            alertRef.current.showAlert({type:'danger', msg:'请拖动滑块完成人机验证'})
            setErrorCode(7);
            return false;
        }
        else if(!emailPattern.test(signinEmail)) {
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

    // 向后端发送注册请求逻辑

    const Signin = async () => {

        let pwd = sha(signinPassword)
        
        // 注册按钮进入加载中状态

        setSigninLoading(true);
        try {
            let response = await axios.post("http://124.221.8.18:8080/user/register", {
                email: signinEmail,
                name: signinName,
                pwd: pwd,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                // alertRef.current.showAlert({ type: 'success', msg: '注册成功' });
                // resetAllState();
                // props.onHide();
                setLoginState(2);
            } else {
                alertRef.current.showAlert({ type: 'danger', msg: `注册失败: ${response}` });
            }
        } catch (error) {
            alertRef.current.showAlert({ type: 'danger', msg: `${error.response.data.detail}` });
        }
        finally {
            // 注册按钮结束加载中状态
            setSigninLoading(false);
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

                                    <a href="#" className="login__button submit" onClick={async()=>{

                                     // 登录逻辑

                                        // 校验输入合法性
                                        if(LoginValidation()) {
                                            setErrorCode(0); // 重置异常代码
                                            let pwd = sha(loginPassword)
                                            try {
                                                let response = await axios.post("http://124.221.8.18:8080/user/login",{
                                                    email: loginEmail,
                                                    pwd: pwd,
                                                },{
                                                    headers:{
                                                        'Content-Type':"application/json",
                                                    }
                                                });
                                                if(response.status == 200) {
                                                    let {token,username,email,uid} = response.data;
                                                    dispatch(login({token,username,email,uid}))

                                                    
                                                    
                                                    // 登录成功
                                                    alertRef.current.showAlert({type:'success', msg:'登录成功'})
                                                    resetAllState();
                                                    let timer = setTimeout(() => {
                                                        props.onHide();
                                                    }, 1200);
                                                    
                                                }
                                                
                                            } catch (error) {
                                                alertRef.current.showAlert({type:'danger', msg:`登录失败: ${error.response.data.detail}`})
                                            }
                                            finally {

                                            }

                                           
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

                                    {/* 人机识别验证码 */}
                                    <SliderCaptcha
                                    
                                        className='captcha_box pt-4'
                                        mode='slider'
                                        tipText={{
                                            default: '请按住滑块，拖动到最右边',
                                            moving: '请按住滑块，拖动到最右边',
                                            error: '验证失败，请重新操作',
                                            success: '验证成功'
                                        }}
                                        errorHoldDuration={1000}
                                        onVerify={(data) => {
                                            console.log(data);
                                            // 默认背景图宽度 320 减去默认拼图宽度 60 所以滑轨宽度是 260
                                            if (data.x === 260) {
                                              return Promise.resolve();
                                            }
                                            return Promise.reject();
                                        }}
                                        
                                        actionRef={actionRef}
                                        style={{
                                            
                                            '--rcsc-panel-border-radius': '10px',
                                            '--rcsc-control-border-radius': '10px'
                                        }}
                                    />

                                    <a href="#" className="login__button submit" onClick={()=>{
 
                                        // 注册逻辑
                                        if(RegisterValidation()) {

                                            setErrorCode(0); // 重置异常代码
                                            // 注册成功
                                            Signin();
                                        }
                                        else { // 表单校验失败 

                                            actionRef.current?.refresh() // 重置滑动验证模块
                                        }

                                        
                                    }}>
                                        <div className='d-flex'>
                                            <div className='ps-3'></div>
                                            {signinLoading? <span className="ms-5 mt-1 spinner-border spinner-border-sm" aria-hidden="flase"></span>:<div className="ms-5 mt-1"></div>}
                                            <div className="pe-2"></div>
                                            <div className='ps-3' >发送验证邮件</div>
                                        </div>
                                    </a>
                                    

                                    <div>
                                        <span className="login__account">已有账号 ?</span>
                                        <span className="login__signup submit" id="sign-in" onClick={()=>{actionRef.current?.refresh();setErrorCode(0);setLoginState(0)}}>登录</span>
                                    </div>
                                </form>


                                {/* 注册成功界面(等待邮箱验证) */}
                                <form action="" className={loginState == 2 ? 'signin__success block' : 'signin__success none'} id="login-up">
                                    <div className='p-3'></div>
                                    
                                        <EmailAnimation/>
                                    
                                    <div className='p-3'></div>
                                    <h3 className='fw-bolder p-0 m-0 text-start'>验证你的电子邮箱</h3>
                                    <div className="p-2"></div>
                                    <p className='text-start text-secondary fw-bold fs-6'>
                                        我们已经发送验证邮件到您的邮箱
                                        <a href="https://126.com">{signinEmail}</a>
                                        ,为了确定这是您的电子邮箱地址,请前往邮箱点击验证链接,完成注册
                                    </p>
                                    <div className="p-1"></div>
                                    <div className="d-flex">
                                    {resendWaiting==0&&<a className="resend__button submit" onClick={()=>{

                                        // 用户点击没有收到邮件 : 需要重新发送邮件

                                        setResendWaiting(60);

                                        Signin(); 
                                        

                                    }}>没有收到邮件
                                    </a>}
                                    {resendWaiting!=0 && <div className="d-flex resend__button_disabled submit">
                                        <div>已经重新发送</div>
                                        <div className='p-1'></div>
                                        <div>{resendWaiting}</div>
                                        </div>}
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