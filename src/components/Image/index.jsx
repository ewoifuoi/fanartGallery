import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './ImageLoadingAnimation.css'



const Image = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            setLoaded(true);
        };
        img.src = props.src;
    }, [props.src]);
    
        
    const img_style = {
        width: '400px',
        position: 'relative',
        height: loaded? 'auto' : '400px',
        overflow: 'hidden',
        transform: hovered ? 'scale(1.005)' : 'scale(1)', // 鼠标悬停时放大图片
    };

    const buttonStyle = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        opacity: '0.8',
        transition: 'opacity 0.3s ease', // 添加过渡效果
        backdropFilter: 'blur(10px) opacity(0.7)'
        
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // 灰色半透明蒙版
        opacity: hovered ? 1 : 0, // 鼠标悬停时显示蒙版
        transition: 'opacity 0.3s ease',
    };

    
    return (
        <div className=''style={img_style}
        onMouseEnter={() => setHovered(true)} // 鼠标进入时显示按钮
        onMouseLeave={() => setHovered(false)} // 鼠标离开时隐藏按钮
        >

            {!loaded && ( // 当图片未加载完成时显示闪烁的图标
                <div className="image-container">
                    <div className="loading-animation">
                    </div>
                </div>
            )}
            
            <img src={props.src} className=" 
            img-thumbnail
            "></img> {/* 图片 */}

            <div 
            className='
            rounded
            '
            style={overlayStyle}></div>  {/* 蒙版 */}

            {hovered && ( // 根据鼠标悬停状态显示按钮
                <React.Fragment>
                    <button
                        type="button"
                        className="btn btn-md m-2 border"
                        style={buttonStyle}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-bookmark-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="btn btn-md border m-2 bg-grey"
                        style={{ ...buttonStyle, left: '57px' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="white"
                            className="bi bi-heart-fill"
                            viewBox="0 0 16 16"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
                            />
                        </svg>
                    </button>
                </React.Fragment>
            )}
        </div>
    )
}

export default Image;