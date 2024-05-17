import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../components/Header'

import { Outlet } from 'react-router-dom'




const Layout = () => {
    return (
        <div style={{ minWidth: '1000px' }}>
      
        <Header className="header" />
        <div className="container-fluid">
            <Outlet/>

        </div>
        </div>
    )
}

export default Layout;