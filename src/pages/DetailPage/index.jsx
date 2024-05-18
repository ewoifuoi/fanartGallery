

import React from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './DetailPage.css'
// import './imagedrawer.js'
import './imagedrawer.css'
import $ from 'jquery'

const DetailPage = () => {
    const params = useParams()
    let id = params.id
    const url = `http://124.221.8.18:8080/image/origin/${id}`
    return (
        <>
            <div className='d-felx'>
                <div className='' style={{height:'auto',width:'600px'}}>
                    <img className='img-animation' src={url} alt="" style={{ animationDuration: '1.2s', filter: 'brightness(1.05) saturate(1.05)' }} />
                </div>
            </div>
        </>
    )
}

export default DetailPage;