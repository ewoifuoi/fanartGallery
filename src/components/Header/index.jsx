import {Button, Nav, Navbar, Container, Offcanvas, NavDropdown, Form } from "react-bootstrap";
import './Header.css'
import LoginModal from "../LoginModal";
import React from "react";
import { useState } from "react";

function Header() {

  const [modalShow, setModalShow] = useState(false);

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
                  <Nav.Link href="" onClick={scrollToTop}
                    className="ml-3">首页</Nav.Link>
                  </Nav>

                  
                  <Nav className="justify-content-end d-flex">

                    {/*用户登录按钮*/}
                    <button type="button"  
                    onClick={() => setModalShow(true)}                     
                    className="btn">登录</button>

                    <div style={{width: '10px'}}></div>

                    <button type="button" className="
                    btn
                    btn-outline-secondary
                    border
                    rounded-4
                    " style={{...buttonStyle}}>注册</button>
                    <div style={{width: '17px'}}></div>
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
                      <div className="">上传图片</div>
                      
                      
                    </button>
                    <div style={{width: '15px'}}></div>
                  </Nav>
                </Offcanvas.Body>

              </Navbar.Offcanvas>

            </Container>
          </Navbar>

          {/* 用户登录模态框 */}
          
          <LoginModal show={modalShow} onHide={()=>setModalShow(false)}/>


      </div>
    );
}

export default Header;