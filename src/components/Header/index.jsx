import {Button, Nav, Navbar, Container, Offcanvas, NavDropdown, Form } from "react-bootstrap";


function Header() {
    
    return (
        <>
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
                  </Nav>

                  
                  <Nav className="justify-content-end d-flex">
                    <Nav.Link href="#action1">登录</Nav.Link>
                    <button type="button" class="btn btn-secondary">注册</button>
                    <button type="button" class="btn btn-success">
                      上传图片
                    </button>
                  </Nav>
                </Offcanvas.Body>

              </Navbar.Offcanvas>

            </Container>
          </Navbar>
      </>
    );
}

export default Header;