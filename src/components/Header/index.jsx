import {Button, Nav, Navbar, Container, Offcanvas, NavDropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import './Header.css'
import LoginModal from "../LoginModal";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../Alerts";
import axios from "axios";
import AvatarDropdown from "../AvatarDropdown";
import { set_avatar } from "../../store/modules/auth";

function Header() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alertRef = useRef(null);
  const dropdownRef = useRef(null);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const imageSrc = useSelector((state) => state.auth.avatar_url);

  const [showDropdown, setShowDropdown] = useState(false);

  // 登录模态框状态
  // 0 : 不显示
  // 1 : 显示登录界面
  // 2 : 显示注册界面
  const [modalState, setModalState] = useState(0);

  const buttonStyle = {
    opacity: '1',
    
 };

  // 点击首页滚动回顶部
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth" // 可以选择平滑滚动或者立即滚动
    });
  };

  // 请求头像图片
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        let response = await axios.get('http://124.221.8.18:8080/user/avatar',{
          responseType:'blob',
          headers: {
            'Authorization':`${localStorage.getItem('token')}`,
          }
        });
        
        let imageUrl = URL.createObjectURL(response.data);
        dispatch(set_avatar(imageUrl))
      } catch(error) {
        alertRef.current.showAlert({type:'danger',msg:`${error}`});
      }
    }
    if(isLoggedIn) fetchAvatar();
    
  },[isLoggedIn])


  // 关闭头像下拉菜单
  useEffect(()=>{
    const handleOutsideClick = (event) => {
      // 如果点击的元素不在弹出框内部，则调用 onClose 函数
      if (dropdownRef.current && dropdownRef.current.checkClick(event) && !event.target.closest('.avatar')) {
        setShowDropdown(false);
      }
    };
    // 添加事件监听器
    document.addEventListener('mousedown', handleOutsideClick);
    // 在组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showDropdown])
    
    return (
        <div className="header">
          <Navbar key="navbar" expand="sm" className="bg-body-tertiary" style={{boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)'}}>
            <Container fluid>

              <Navbar.Brand href="#"
              className="">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" className="bi bi-transparency" viewBox="0 0 16 16">
                <path d="M0 6.5a6.5 6.5 0 0 1 12.346-2.846 6.5 6.5 0 1 1-8.691 8.691A6.5 6.5 0 0 1 0 6.5m5.144 6.358a5.5 5.5 0 1 0 7.714-7.714 6.5 6.5 0 0 1-7.714 7.714m-.733-1.269q.546.226 1.144.33l-1.474-1.474q.104.597.33 1.144m2.614.386a5.5 5.5 0 0 0 1.173-.242L4.374 7.91a6 6 0 0 0-.296 1.118zm2.157-.672q.446-.25.838-.576L5.418 6.126a6 6 0 0 0-.587.826zm1.545-1.284q.325-.39.576-.837L6.953 4.83a6 6 0 0 0-.827.587l4.6 4.602Zm1.006-1.822q.183-.562.242-1.172L9.028 4.078q-.58.096-1.118.296l3.823 3.824Zm.186-2.642a5.5 5.5 0 0 0-.33-1.144 5.5 5.5 0 0 0-1.144-.33z"/>
              </svg> 
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
                
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-sm`}
                aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
                placement="end"
              > 

                <Offcanvas.Body
                >
                  <Nav className="justify-content-start flex-grow-1 pe-3 ">
                  <div style={{width: '10px'}}></div>
                  <Nav.Link href="" onClick={()=>{navigate('/')}}
                    className="ml-3">首页</Nav.Link>
                  </Nav>

                  
                  <Nav className="justify-content-end d-flex">

                  <button type="button" className="
                    btn btn-success
                    d-flex
                    justify-content-center
                    align-items-center
                    rounded-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-cloud-upload-fill" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
                      </svg>
                      <div style={{width:'7px'}}></div>
                      <div className="" onClick={()=>{
                        if(isLoggedIn) {

                          // 载入上传页面

                        }
                        else {

                          // 如果用户没有登录, 则载入用户登录界面
                          setModalState(1)

                        }
                      }}>上传图片</div>
                    </button>
                      
                    <div className="p-2"></div>

                    {/* 用户未注册的注册与登录模块  */}
                    {!isLoggedIn && (<div className="d-flex">
                        {/*用户登录按钮*/}
                      <button type="button"  
                      onClick={() => setModalState(1)}                     
                      className="btn">登录</button>
                      <div className="p-1"></div>
                      <button type="button" className="
                      btn
                      btn-outline-secondary
                      border
                      rounded-4
                      " style={{...buttonStyle}}
                      onClick={()=>{setModalState(2)}}>注册</button>
                    </div>)}

                    
                    

                    {/* 用户登陆后的用户信息板块 */}
                    {isLoggedIn && (
                      <div className="d-flex">
                        
                        <div className="circular-link position-relative">
                          <svg t="1716469676499" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11058" width="25" height="25"><path d="M849.6 713.4c8.4-0.4 16.7 1.8 23.8 6.4-28.9-18.5-46.4-50.4-46.3-84.8V436c0-145.9-105.7-267.6-246.9-297.5v-7.2c0-37.1-30.1-67.1-67.2-67.1h-0.1c-37.1 0-67.3 30.1-67.3 67.2v7C304.3 168.4 198.7 290 198.7 436v199.1c0 35.7-18.6 66.9-46.4 84.8 7-4.6 15.4-6.9 23.8-6.4-24.7-0.9-45.5 18.4-46.4 43.1-0.9 24.7 18.4 45.5 43.1 46.4h676.6c24.7 0.1 44.8-20 44.9-44.7 0.1-24.8-19.9-44.9-44.7-44.9zM513 959.8c62 0 112.2-50.2 112.2-111.9H400.7c0 61.7 50.2 111.9 112.3 111.9z" p-id="11059"></path></svg>
                          
                          <span style={{top:'28%',left:'70%'}} className="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
                          </span>

                        </div>

                        <div className="p-1"></div>

                        <div className="circular-link position-relative">
                          <svg t="1716466844842" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4163" width="25" height="25"><path d="M640 682.666667a170.666667 170.666667 0 0 0 170.666667-170.666667V256a170.666667 170.666667 0 0 0-170.666667-170.666667H213.333333a170.666667 170.666667 0 0 0-170.666666 170.666667v533.333333a21.333333 21.333333 0 0 0 21.333333 21.333334 20.906667 20.906667 0 0 0 14.933333-6.4l85.333334-85.333334A128 128 0 0 1 256 682.666667z m256-426.666667v341.333333a170.666667 170.666667 0 0 1-170.666667 170.666667H213.333333a85.333333 85.333333 0 0 0 85.333334 85.333333h469.333333a128 128 0 0 1 90.88 37.546667l85.333333 85.333333a20.906667 20.906667 0 0 0 14.933334 6.4 21.333333 21.333333 0 0 0 21.333333-21.333333V341.333333A85.333333 85.333333 0 0 0 896 256z" p-id="4164"></path></svg>
                          <span style={{top:'28%',left:'78%'}} className="position-absolute translate-middle p-1 bg-danger border border-light rounded-circle">
                          </span>
                        
                        </div>

                        <div className="p-2"></div>

                        <div className="circular-link position-relative avatar" onClick={()=>{
                          if (showDropdown == false){ setShowDropdown(true);}
                          else {setShowDropdown(false);}
                        }}>
                          <img style={{userSelect:'none'}} draggable="false" className="circular-img" src={imageSrc} alt="/images/default.png" />
                          <span style={{top:'80%',left:'85%'}} className="position-absolute translate-middle p-1 bg-success border border-light rounded-circle">
                          </span>
                        </div>

                        <AvatarDropdown show={showDropdown} ref={dropdownRef} className="dropdown" logout={()=>{setShowDropdown(false)}}/>

                      </div>
                    )}

                    <div className="p-2"></div>

                  </Nav>
                </Offcanvas.Body>

              </Navbar.Offcanvas>

            </Container>
          </Navbar>

          {/* 用户登录模态框 */}
          
          <LoginModal show={modalState!=0?true:false} onHide={()=>setModalState(0)} modalstate={modalState}/>
          
          <Alerts ref={alertRef}/>

      </div>
    );
}

export default Header;