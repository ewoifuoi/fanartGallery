
import React, { useEffect, useState, useRef } from 'react';
import Image from '../Image';


const Gallery = ()=>{

    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    // 异步请求获取图片链接
        fetchImages();
    }, []);

    

    const fetchImages = async () => {
        try {
            const response = await fetch('http://124.221.8.18:8080/image/');
            if (!response.ok) {
                throw new Error('请求失败');
            }
            const data = await response.json();
            setImages(data.image);
        } catch (error) {
            console.error('发生错误:', error);
        }
        finally {
            setLoading(false);
        }
    };

    const columnsRef = useRef([[],[],[]]); // 画廊的三列

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
            <div className="
            container-fluid text-center
            ">
                <div className="row">
                    {columnsRef.current.map((column, columnIndex) =>(
                        <div key={columnIndex} className="col-lg-4 col-md-6">
                            {column.map((image, index) => (
                                <div key={index} className="m-2">
                                    <Image className="w-100 shadow-1-strong rounded" src={image} />
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