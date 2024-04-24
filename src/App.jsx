import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './components/Header'
import Board from './components/Board'
import Gallery from './components/Gallery'

function App() {
  return (
    
    <div style={{minWidth:'1000px'}}>
        <Header/>
        <div className="container-fluid">
        <Board/> 

        <div style={{minHeight:'1200px', height:'auto'}}  /**内容 */
        className="d-flex flex-row 
        gap-3
        justify-content-center
        justify-items-center 
        
        bg-warning
        ">
          <div  /**画廊看板 */
          style={{width:'1220px',minWidth:'1000px'}}
          className="
          d-flex
          justify-content-center
          justify-items-center
          ">
            <Gallery/>
          </div>
          
          <div style={{width:'250px',height:'600px'}} /**排行榜 */
          className='
          d-none d-lg-block
          border
          bg-danger
          rounded '>

          </div>
        </div>
        
        </div>
    </div>
    
  )
}
 
export default App
