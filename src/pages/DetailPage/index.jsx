

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import './DetailPage.css'
import axios from 'axios'

import Alerts from '../../components/Alerts'
import Loading from '../../components/Loading'
import ImageDrawer from '../../components/ImageDrawer'
import { useSelector } from 'react-redux'
import { refresh } from '../../store/modules/modal'
import { format } from 'date-fns';

const DetailPage = () => {
    const params = useParams()
    let id = params.id
    const url = `http://124.221.8.18:8080/image/origin/${id}`
    
    // 提示消息列表的引用 <Alerts/> 组件
    const alertRef = useRef(null);
    const uid = useSelector((state)=>state.auth.uid)
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)

    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState('');

    const [authorName, setAuthorName] = useState('');
    const [authorUid, setAuthorUid] = useState('');
    const [authorAvatarUrl, setAuthorAvatarUrl] = useState('');
    const [hasWatched, setHasWatched] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [title, setTitle] = useState('');
    const [height, setHeight] = useState('');
    const [width, setWidth] = useState('');
    const [filesize, setFileSize] = useState('');
    const [filetype, setFileType] = useState('');
    const [likecount, setLikeCount] = useState(0);
    const [viewcount, setViewCount] = useState(0);
    const [datetime, setDateTime] = useState('');

    const [isFavoriated, setIsFavorited] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const checkFavorite = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/check_favorite/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                // console.log("success");
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

    const checkLike = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/check_like/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("success");
                setIsLiked(response.data);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
      }

    const like = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/like/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("点赞成功");
                setIsLiked(true);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
    }

    const unlike = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/unlike/${id}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                console.log("取消点赞");
                setIsLiked(false);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            console.log(error.response.data.detail);
        }
    }

    const follow = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/follow/${uid}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                alertRef.current.showAlert({ type: 'success', msg: "关注成功" });
                dispatch(refresh())
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            // alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
      }

      const unfollow = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/unfollow/${uid}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                alertRef.current.showAlert({ type: 'success', msg: "取消关注成功" });
                dispatch(refresh())
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            // alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
      }

    const checkWatcher = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/hasWatched/${authorUid}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                setHasWatched(response.data);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            // alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
    }

    const fetch_author_info = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/illust/author/${id}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.status == 200) {
                let res = response.data;
                setAuthorAvatarUrl(res.avatar_url);
                setAuthorName(res.name);
                setAuthorUid(res.uid);
                
            }
        }
        catch(error) {
            alertRef.current.showAlert({type:'danger', msg:`获取用户作品失败:${error}`})
        }
    }

    const fetch_info = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/illust/info/${id}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.status == 200) {
                let res = response.data;
                setTitle(res.Title);
                setHeight(res.Height);
                setWidth(res.Width);
                setFileSize(res.Filesize);
                setFileType(res.FileType);
                setDateTime(format(res.Datetime, 'yyyy 年 MM 月 dd 日'));
                setLikeCount(res.LikeCount);
                setViewCount(res.ViewCount);
                
            }
        }
        catch(error) {
            alertRef.current.showAlert({type:'danger', msg:`获取用户作品失败:${error}`})
        }
    }

    const fetchImage = async () => {
        try {
          const response = await axios.get(url, { responseType: 'blob' });
          const imageUrl = URL.createObjectURL(response.data);
          setImageSrc(imageUrl);
          setLoading(false);
        } catch (error) {
            alertRef.current.showAlert({type:'danger', msg:`${error}`})
        }
    };


    useEffect(()=>{
        fetch_author_info();
        fetchImage();
        fetch_info();
        checkFavorite();
        checkLike();
    },[]);

    useEffect(()=>{
        checkWatcher();
        if(uid == authorUid) {
            setIsOwner(true);
        }
        else {
            setIsOwner(false);
        }
    }, [authorUid])

    return (
        <>
            <div>
                <div className='p-5'></div>
                {/* 提示消息列表 */}
                <Alerts ref={alertRef}/>
                {loading && <Loading/>}

                    {!loading&& <div className='d-flex justify-content-center'>

                        
                        <div>

                            {/* 插画展板 */}
                            <div className='card-detail'>
                                <ImageDrawer width="750px" imageUrl={imageSrc}/>
                            </div>

                            {/* 获赞与浏览量 */}
                            <div className='d-flex p-2'>
                                <div style={{width:'20px'}}></div>
                                <div style={{fontWeight:'bold', color:'#777'}}>{`获赞数: ${likecount}`}</div>
                                <div style={{width:'20px'}}></div>
                                <div style={{fontWeight:'bold', color:'#777'}}>{`浏览量: ${viewcount}`}</div>
                            </div>

                            <div className='p-3 rounded' style={{width:'700px',height:'400px'}}>
                                <div></div>
                            </div>
                        </div>
                        
                        <div style={{width:'5px'}}></div>

                        <div>

                            {/* 点赞与收藏 */}
                            <div className='ps-3 rounded' style={{width:'400px',height:'90px'}}>
                                <div className='d-flex align-items-center' style={{width:'100%', height:'100px'}}>
                                    <div style={{width:'80px'}}></div>
                                    
                                    <div onClick={()=>{
                                        if(isLoggedIn == false) {
                                            dispatch(showLoginModal())
                                        }
                                        else if(isLiked == false) {
                                            like();
                                        }
                                        else {
                                            unlike();
                                        }
                                    }}>
                                        {!isLiked && <div>
                                            <div className='d-flex justify-content-center align-items-center button-detail' style={{height:'60px', width:'60px', border:'1.8px solid #B5B5B5', borderRadius:'40px'}}>
                                                <svg t="1717673908321" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5950" width="30" height="30"><path d="M736.064853 106.27072c-110.639787 0-189.91104 99.710293-224.078506 152.446293-34.194773-52.736-113.41824-152.446293-224.07168-152.446293C129.140053 106.27072 0 249.357653 0 425.22624c0 82.213547 55.773867 200.116907 123.487573 261.802667C217.14944 807.376213 480.453973 1024 512.969387 1024c33.082027 0 290.73408-212.411733 386.095786-335.517013C967.959893 625.691307 1024 507.644587 1024 425.22624c0-175.868587-129.14688-318.95552-287.935147-318.95552z" fill="#8f8f8f" p-id="5951"></path></svg>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                            <div style={{fontSize:'18px', fontWeight:'bold', color:'#8f8f8f'}}>赞</div>
                                            </div>
                                        </div>}

                                        {isLiked && <div>
                                            <div className='d-flex justify-content-center align-items-center button-detail' style={{height:'60px', width:'60px', border:'2px solid #B5B5B5', borderRadius:'40px'}}>
                                                <svg t="1717673908321" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5950" width="30" height="30"><path d="M736.064853 106.27072c-110.639787 0-189.91104 99.710293-224.078506 152.446293-34.194773-52.736-113.41824-152.446293-224.07168-152.446293C129.140053 106.27072 0 249.357653 0 425.22624c0 82.213547 55.773867 200.116907 123.487573 261.802667C217.14944 807.376213 480.453973 1024 512.969387 1024c33.082027 0 290.73408-212.411733 386.095786-335.517013C967.959893 625.691307 1024 507.644587 1024 425.22624c0-175.868587-129.14688-318.95552-287.935147-318.95552z" fill="#E97B85" p-id="5951"></path></svg>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div style={{fontSize:'18px', fontWeight:'bold', color:'#8f8f8f'}}>赞</div>
                                            </div>
                                        </div>}
                                    </div>

                                    <div style={{width:'75px'}}></div>

                                    <div onClick={()=> {
                                        if(isLoggedIn == false) {
                                            dispatch(showLoginModal())
                                        }
                                        else if(isFavoriated == false) {
                                            favoriate();
                                        }
                                        else {
                                            unfavoriate();
                                        }
                                    }}>
                                        {!isFavoriated && <div>
                                            <div className='d-flex justify-content-center align-items-center button-detail' style={{height:'60px', width:'60px', border:'1.8px solid #B5B5B5', borderRadius:'40px'}}>
                                                <svg t="1717674366601" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8830" width="50" height="50"><path d="M529.5104 162.6112l101.5808 205.824c2.8672 5.7344 8.3968 9.8304 14.7456 10.752l227.2256 32.9728c16.0768 2.3552 22.4256 22.1184 10.8544 33.3824L719.5648 605.7984c-4.608 4.5056-6.7584 10.9568-5.632 17.3056l38.8096 226.304c2.7648 15.9744-14.0288 28.16-28.3648 20.6848L521.1136 763.1872c-5.7344-2.9696-12.4928-2.9696-18.2272 0L299.7248 870.0928c-14.336 7.5776-31.1296-4.608-28.3648-20.6848l38.8096-226.304c1.1264-6.3488-1.024-12.8-5.632-17.3056L140.0832 445.5424c-11.5712-11.3664-5.2224-31.0272 10.8544-33.3824l227.2256-32.9728c6.3488-0.9216 11.8784-4.9152 14.7456-10.752l101.5808-205.824c7.168-14.6432 27.8528-14.6432 35.0208 0z" p-id="8831" fill="#8f8f8f"></path></svg>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div style={{fontSize:'18px', fontWeight:'bold', color:'#8f8f8f'}}>收藏</div>
                                            </div>
                                        </div>}

                                        {isFavoriated && <div>
                                            <div className='d-flex justify-content-center align-items-center button-detail' style={{height:'60px', width:'60px', border:'2px solid #B5B5B5', borderRadius:'40px'}}>
                                                <svg t="1717674366601" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8830" width="50" height="50"><path d="M529.5104 162.6112l101.5808 205.824c2.8672 5.7344 8.3968 9.8304 14.7456 10.752l227.2256 32.9728c16.0768 2.3552 22.4256 22.1184 10.8544 33.3824L719.5648 605.7984c-4.608 4.5056-6.7584 10.9568-5.632 17.3056l38.8096 226.304c2.7648 15.9744-14.0288 28.16-28.3648 20.6848L521.1136 763.1872c-5.7344-2.9696-12.4928-2.9696-18.2272 0L299.7248 870.0928c-14.336 7.5776-31.1296-4.608-28.3648-20.6848l38.8096-226.304c1.1264-6.3488-1.024-12.8-5.632-17.3056L140.0832 445.5424c-11.5712-11.3664-5.2224-31.0272 10.8544-33.3824l227.2256-32.9728c6.3488-0.9216 11.8784-4.9152 14.7456-10.752l101.5808-205.824c7.168-14.6432 27.8528-14.6432 35.0208 0z" p-id="8831" fill="#E2C678"></path></svg>
                                            </div>
                                            <div className='d-flex justify-content-center align-items-center'>
                                                <div style={{fontSize:'18px', fontWeight:'bold', color:'#8f8f8f'}}>收藏</div>
                                            </div>
                                        </div>}

                                    </div>

                                </div>
                            </div>

                            <div className='p-2'></div>

                            {/* 作者信息 */}
                            <div className='ps-3 rounded' style={{width:'400px',height:'190px'}}>
                                <div style={{width:'100%', height:'190px'}} className='card-detail'>
                                    <div className='d-flex align-items-center p-3'>
                                        <div className='d-flex'>
                                            <div style={{width:'10px'}}></div>
                                            <img style={{height:'60px', width:'60px', borderRadius:'30px'}} draggable='false' src={authorAvatarUrl} alt="" />
                                            <div style={{width:'13px'}}></div>
                                            <div className='d-flex justify-content-center align-items-center'>

                                                <div>
                                                    <div style={{fontSize:'25px', fontWeight:'bold', userSelect:'none'}} className='author_name'>{authorName}</div>
                                                    <div className='d-flex align-items-center'>
                                                        <div style={{width:'3px'}}></div>
                                                        <svg t="1717664063324" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5404" width="14" height="14"><path d="M512 64.49899 512 64.49899c-247.148913 0-447.50101 200.353121-447.50101 447.50101l0 0.001023c0 247.14789 200.353121 447.50101 447.50101 447.50101l0.001023 0c247.14789 0 447.50101-200.353121 447.50101-447.50101l0-0.001023C959.50101 264.85211 759.14789 64.49899 512 64.49899zM710.214411 408.40969 496.774227 621.849874c0 0-0.001023 0.001023-0.001023 0.001023-0.001023 0.001023-0.001023 0.001023-0.002047 0.002047l-1.070378 1.070378c-5.852288 5.852288-13.643742 8.694009-21.530362 8.581446-7.886621 0.112564-15.677051-2.729158-21.530362-8.581446L334.48605 504.767272c-11.861142-11.861142-11.380188-31.680537 1.072425-44.132126s32.270984-12.933567 44.132126-1.072425l94.480838 94.480838L665.010883 363.205139c11.861142-11.861142 31.680537-11.380188 44.132126 1.072425C721.594599 376.729154 722.075553 396.548548 710.214411 408.40969z" fill="#198754" p-id="5405"></path></svg>
                                                        <div style={{width:'2px'}}></div>
                                                        <div style={{fontSize:"12px",fontWeight:'bold', color:'#198754', userSelect:'none'}}>在线中</div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    <div style={{height:'5px'}}></div>

                                    <div className='d-flex justify-content-center align-items-center'>
                                        {!isOwner && <a className="custom-button-detail" onClick={()=>{
                                            
                                            if(!isLoggedIn) {
                                                dispatch(showLoginModal())
                                            }
                                            else if(hasWatched) {
                                                setHasWatched(false);
                                                unfollow();
                                            }
                                            else {
                                                setHasWatched(true);
                                                follow();
                                            }

                                        }}>
                                            {!hasWatched && <div className="d-flex" style={{alignContent:'center', justifyContent:'center'}}>
                                                <svg t="1716552985086" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2592" width="26" height="23"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#fff" p-id="2593"></path></svg>
                                                <div style={{width:'4px'}}></div>
                                                <div>关注</div>
                                                <div style={{width:'6px'}}></div>
                                            </div>}
                                            {hasWatched && <div className="d-flex" style={{alignContent:'center', justifyContent:'center'}}>
                                                <svg t="1717557575903" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4254" width="26" height="23"><path d="M933.568 211.008c-27.072-28.096-71.232-28.096-98.304 0.128l-474.816 492.096L213.12 550.656c-27.2-28.16-71.232-28.16-98.432-0.064-27.008 28.096-27.008 73.664 0 101.952l196.864 203.904c27.008 28.096 71.104 28.096 98.304 0.128 0.512-0.576 0.704-1.344 1.216-1.92l522.56-541.632C960.64 284.8 960.64 239.232 933.568 211.008z" fill="#ffffff" p-id="4255"></path></svg>
                                                <div style={{width:'4px'}}></div>
                                                <div>已关注</div>
                                                <div style={{width:'6px'}}></div>
                                            </div>}
                                        </a>}
                                    </div>

                                </div>
                            </div>

                            <div className='p-2'></div>

                            {/* 作品详情信息 */}
                            <div className='ps-3 rounded' style={{width:'400px',height:'280px'}}>
                                <div style={{width:'100%', height:'280px'}} className='card-detail'>
                                    <div style={{fontSize:'18px', fontWeight:'bold', color:'#555555', userSelect:'none'}} className='p-3'>作品详情</div>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <div style={{width:'320px', height:'195px', border:'1px solid #9E9E9E99'}}>

                                            <div className='d-flex' style={{width:'100%', height:'38px'}}>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'30%', backgroundColor:'#F5F5F5'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>标题</div>
                                                </div>
                                                <div style={{height:'100%', width:'1px',backgroundColor:'#9E9E9E99'}}></div>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'70%', backgroundColor:'white'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>{title}</div>
                                                </div>
                                            </div>
                                            <div style={{width:'100%', height:'1px', backgroundColor:'#9E9E9E99'}}></div>

                                            <div className='d-flex' style={{width:'100%', height:'38px'}}>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'30%', backgroundColor:'#F5F5F5'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>尺寸</div>
                                                </div>
                                                <div style={{height:'100%', width:'1px',backgroundColor:'#9E9E9E99'}}></div>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'70%', backgroundColor:'white'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>{`${width} x ${height}`}</div>
                                                </div>
                                            </div>
                                            <div style={{width:'100%', height:'1px', backgroundColor:'#9E9E9E99'}}></div>

                                            <div className='d-flex' style={{width:'100%', height:'38px'}}>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'30%', backgroundColor:'#F5F5F5'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>大小</div>
                                                </div>
                                                <div style={{height:'100%', width:'1px',backgroundColor:'#9E9E9E99'}}></div>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'70%', backgroundColor:'white'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>{filesize}</div>
                                                </div>
                                            </div>
                                            <div style={{width:'100%', height:'1px', backgroundColor:'#9E9E9E99'}}></div>

                                            <div className='d-flex' style={{width:'100%', height:'38px'}}>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'30%', backgroundColor:'#F5F5F5'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>格式</div>
                                                </div>
                                                <div style={{height:'100%', width:'1px',backgroundColor:'#9E9E9E99'}}></div>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'70%', backgroundColor:'white'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>{filetype}</div>
                                                </div>
                                            </div>
                                            <div style={{width:'100%', height:'1px', backgroundColor:'#9E9E9E99'}}></div>

                                            <div className='d-flex' style={{width:'100%', height:'38px'}}>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'30%', backgroundColor:'#F5F5F5'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-2'>上传时间</div>
                                                </div>
                                                <div style={{height:'100%', width:'1px',backgroundColor:'#9E9E9E99'}}></div>
                                                <div className='d-flex align-items-center' style={{height:'100%', width:'70%', backgroundColor:'white'}}>
                                                    <div style={{fontSize:'14px', color:'#555', userSelect:'none'}} className='p-3'>{datetime}</div>
                                                </div>
                                            </div>
                                            <div style={{width:'100%', height:'1px', backgroundColor:'#9E9E9E99'}}></div>

                                        </div>
                                </div>
                            </div>
                            </div>

                            
                        </div>
                    </div>}
                    
            </div>
        </>
    )
}
export default DetailPage;