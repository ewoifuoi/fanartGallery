import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from '../../components/Header'
import Board from '../../components/Board'
import Gallery from '../../components/Gallery'




const Layout = () => {
    return (
        <div style={{ minWidth: '1000px' }}>
      
        <Header className="header" />
        <div className="container-fluid">
            <Board />
            
            <div style={{ minHeight: '1200px', height: 'auto' }}  /**内容 */
            className="d-flex flex-row 
            gap-3
            justify-content-center
            justify-items-center 
            
            
            ">
            <div  /**画廊看板 */
                style={{ width: '1500px', minWidth: '1000px' }}
                className="
            d-flex
            justify-content-center
            justify-items-center
            ">
                <Gallery />
            </div>

            </div>

        </div>
        </div>
    )
}

export default Layout;