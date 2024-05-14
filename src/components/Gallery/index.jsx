
import React, { useEffect, useState, useRef } from 'react';
import Image from '../Image';
import Alerts from '../Alerts';
import URL from '../../config.js'


const Gallery = ()=>{

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 提示消息列表的引用 <Alerts/> 组件
    const alertRef = useRef(null);

    useEffect(() => {
    // 异步请求获取图片链接
        fetchImages();
    }, []);

    

    const fetchImages = async () => {
        try {
            const response = await fetch(URL.IMAGE_URL);
            if (!response.ok) {
                throw new Error('请求失败');
            }
            const data = await response.json();
            setImages(data.image);
        } catch (error) {
            alertRef.current.showAlert({type:'danger', msg:'当前网络状态不佳'})
        }
        finally {
            setLoading(false);
        }
    };

    const columnsRef = useRef([[],[],[],[]]); // 画廊的三列

    const handleScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight && !loading) {
            fetchImages();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

    images.forEach((image, index) => {
        const shortestColumn = columnsRef.current.reduce((acc, curr) => (curr.length < acc.length ? curr : acc), columnsRef.current[0]);
        
        shortestColumn.push(image);
    });
    

    
    return (
        <>
            {/* 提示消息列表 */}
            <Alerts ref={alertRef}/>
            <div className="
            container-fluid text-center
            ">
                <div className="row">
                    {columnsRef.current.map((column, columnIndex) =>(
                        <div key={columnIndex} className="col-lg-3 col-md-6">
                            {column.map((image, index) => (
                                <div key={index} className="mb-2">
                                    <Image className="w-100 shadow-2-strong rounded" src={image.src} tags={image.tags} />
                                </div>
                            ))}
                    </div>
                    ))}

                   
                </div>
                
            </div>
        </>
    )
}

export default Gallery;