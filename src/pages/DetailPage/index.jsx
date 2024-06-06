

import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import './DetailPage.css'
import axios from 'axios'

import Alerts from '../../components/Alerts'
import Loading from '../../components/Loading'
import ImageDrawer from '../../components/ImageDrawer'
import { useSelector } from 'react-redux'

const DetailPage = () => {
    const params = useParams()
    let id = params.id
    const url = `http://124.221.8.18:8080/image/origin/${id}`
    
    // 提示消息列表的引用 <Alerts/> 组件
    const alertRef = useRef(null);
    const uid = useSelector((state)=>state.auth.uid)

    const [loading, setLoading] = useState(true);
    const [imageSrc, setImageSrc] = useState('');

    const [authorName, setAuthorName] = useState('');
    const [authorUid, setAuthorUid] = useState('');
    const [authorAvatarUrl, setAuthorAvatarUrl] = useState('');
    const [hasWatched, setHasWatched] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

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
                            <div className='card-detail'>
                                <ImageDrawer width="750px" imageUrl={imageSrc}/>
                            </div>
                            <div className='p-2'></div>
                            <div className='p-3 border border-3 rounded' style={{width:'700px',height:'400px'}}></div>
                        </div>
                        
                        <div style={{width:'10px'}}></div>

                        <div>
                            <div className='p-3 rounded' style={{width:'400px',height:'400px'}}>
                                <div style={{width:'100%', height:'200px'}} className='card-detail'>
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
                                            // 点击关注
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
                            <div className='p-3 border border-3 rounded' style={{width:'400px',height:'400px'}}></div>
                        </div>
                    </div>}
                    
            </div>
        </>
    )
}
export default DetailPage;