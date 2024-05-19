

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './DetailPage.css'
import './imagedrawer.css'

import Alerts from '../../components/Alerts'
import Loading from '../../components/Loading'

const DetailPage = () => {
    const params = useParams()
    let id = params.id
    const url = `http://124.221.8.18:8080/image/origin/${id}`
    
    // 提示消息列表的引用 <Alerts/> 组件
    const alertRef = useRef(null);

    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState('');

    useEffect(()=>{

        const fetchImage = async () => {
            try {
              const response = await axios.get(url, { responseType: 'blob' });
              const imageUrl = URL.createObjectURL(response.data);
              setImageSrc(imageUrl);
              setLoading(false);
            } catch (error) {
                alertRef.current.showAlert({type:'danger', msg:'当前网络状态不佳'})
            //   setLoading(false);
            }
        };

        fetchImage();
    },[]);

    return (
        <>
            <div>
                <div className='p-5'></div>
                {/* 提示消息列表 */}
                <Alerts ref={alertRef}/>
                {loading ? (
                    <Loading/>
                ) : (
                    <img src={imageSrc} alt="Loaded" style={{ maxWidth: '100%' }} />
                )}
            </div>
            
        </>
    )
}

export default DetailPage;