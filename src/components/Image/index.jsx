import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './ImageLoadingAnimation.css'
import axios from 'axios'


const Image = (props) => {
    const [loaded, setLoaded] = useState(false);
    const [hovered, setHovered] = useState(false);

    const url = props.src;
    const parts = url.split("/");
    const lastPart = parts[parts.length - 1];

    // 再根据点号 . 分割最后一个部分，并选择第一个部分，即文件名部分
    const id = lastPart;
    const [isFavoriated, setIsFavorited] = useState(false);

    useEffect(() => {
        const img = new window.Image();
        img.onload = () => {
            setLoaded(true);
        };
        img.src = props.src;
    }, [props.src]);

        
    const img_style = {
        width: `${props.realWidth}`,
        position: 'relative',
        height: loaded? 'auto' : `${props.defaultHeight}`,
        overflow: 'hidden',
        transform: hovered ? 'scale(1.005)' : 'scale(1)', // 鼠标悬停时放大图片
    };

    const buttonStyle1 = {
        position: 'absolute',
        top: '10px',
        left: '10px',
        backgroundColor: isFavoriated? '#BE851C98':'',
        opacity: '0.8',
        transition: 'opacity 0.3s ease', // 添加过渡效果
        backdropFilter: 'blur(10px) opacity(0.7)'
        
    };

    const buttonStyle2 = {
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

    const tagStyle = {
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        opacity: '0.8',
        transition: 'opacity 0.3s ease', // 添加过渡效果
        backdropFilter: 'blur(10px) opacity(0.7)'
    }

    useEffect(()=>{
        checkFavorite();
    },
    [hovered])

    const checkFavorite = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/check_favorite/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("success");
                setIsFavorited(response.data);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
      }

    const favoriate = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/favorite/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("收藏成功");
                setIsFavorited(true);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
    }

    const unfavoriate = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/unfavorite/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("取消收藏");
                setIsFavorited(false);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
    }
    
    return (
        <div className=''style={img_style}
            onMouseEnter={() => setHovered(true)} // 鼠标进入时显示按钮
            onMouseLeave={() => setHovered(false)} // 鼠标离开时隐藏按钮
        >

                {/* 图片加载动画 */}
                {!loaded && (
                     <div style={{position: 'absolute',top:0,height:'100%',width:'100%'}}>
                        <p className="placeholder-glow rounded">
                            <span style={{height:'400px', padding:0,margin:0,position:'absolute',left:0, top:0 }} className={'rounded placeholder col-12 bg-secondary z-3'}></span>
                        </p>
                    </div>
                )}
                
                {/* 图片 */}
                {loaded && (
                    <img src={props.src} className=" 
                    img-animation
                    img-thumbnail
                    "></img> 
                )}

            {/* 蒙版 */}
            <div 
            className='
            rounded
            '
            style={overlayStyle}
            onClick={()=>{
                let idRegex = /image\/([^\/]+)$/;
                let match = props.src.match(idRegex);
                let id = match[1];
                // 点击插画作品跳转作品详情页
                
                window.open(`http://localhost:5173/illustration/${id}`, '_blank');
    
            }}></div>  

            {/* 三个标签 */}
            {hovered &&  props.tags && props.showButton && (
                <div style={{...tagStyle}} className='d-flex'>
                    {props.tags.length>0 &&(<a className="p-1 fs-6 text-white text-decoration-none" >{props.tags[0]}</a>)}
                    {props.tags.length>1 &&(<a className="p-1 fs-6 text-white text-decoration-none" >{props.tags[1]}</a>)}
                    {props.tags.length>2 &&(<a className="p-1 fs-6 text-white text-decoration-none" >{props.tags[2]}</a>)}
                </div>
            )}

            {hovered && loaded && props.showButton && ( // 根据鼠标悬停状态显示按钮
                <React.Fragment>
                    <button
                        type="button"
                        className="btn btn-md m-2 border btn-outline-light"
                        style={buttonStyle1}
                        onClick={()=>{
                            if(isFavoriated == false) {
                                favoriate();
                            }
                            else {
                                unfavoriate();
                            }
                            
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-bookmark-fill"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
                        </svg>
                    </button>

                    <button
                        type="button"
                        className="btn btn-md border m-2 btn-outline-light"
                        style={{ ...buttonStyle2, left: '57px' }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
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