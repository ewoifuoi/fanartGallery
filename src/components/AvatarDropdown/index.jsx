import React, { useState, useRef, useEffect } from 'react';
import './AvatarDropdown.css'
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/modules/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AvatarDropdown = (props,ref) => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const imageSrc = useSelector((state)=>state.auth.avatar_url);
    const username = useSelector((state)=>state.auth.username);
    const email = useSelector((state)=>state.auth.email);
    const uid = useSelector((state)=>state.auth.uid);
    const [followingcount, setFollowingcount] = useState(0);
    const [followercount, setFollowercount] = useState(0);
    // 使用 useImperativeHandle 暴露 closeDropdown 方法给父组件
    useImperativeHandle(ref, () => ({
        checkClick : (event)=>{
            if(event.target.closest('.drop_box')) return false;
            else return true;
        }
    }));

    const fetchData = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/profile/${uid}`,{
                headers:{
                    'Content-Type':"application/json"
                }
            });
            if(response.status == 200) {
                let {username,email,workscount,followerscount,followingcount,likecount} = response.data;
                setFollowingcount(followingcount);setFollowercount(followerscount);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';

            // alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <div>
           <div className={`drop_box ${props.show==true?'show':''}`} >
                <div className="drop_menu">
                    <div className="p-1"></div>

                    <div className="drop_title">
                        <div className="p-1"></div>
                        <div>
                            <img draggable='false' className='drop_item_img' src={imageSrc} alt="/images/default.png" />
                            <span style={{top:'62px',left:'60px'}} className="position-absolute translate-middle p-1 bg-success border border-light rounded-circle">
                            </span>
                        </div>
                        <div className="p-1"></div>
                        <div>
                            <div style={{fontSize:'18px',fontFamily:'Arial',userSelect:'none'}}>{username}</div>
                            <div style={{fontSize:'12px',color:'grey',userSelect:'none'}}>{email}</div>
                        </div>
                    </div>
                    
                    <div className='drop_sub_title'>
                        <div className="ps-4"></div>
                        <div className='ps-4'></div>
                        <div>
                            <div style={{textAlign:'center',fontFamily:'Arial',fontWeight:'bold',userSelect:'none'}}>{followingcount}</div>
                            <div style={{fontSize:'14px',color:'#707070',userSelect:'none'}}>已关注</div>
                        </div>
                        <div className="ps-5"></div>
                        <div>
                            <div style={{textAlign:'center',fontFamily:'Arial',fontWeight:'bold',userSelect:'none'}}>{followercount}</div>
                            <div style={{fontSize:'14px',color:'#707070',userSelect:'none'}}>粉丝</div>
                        </div>
                    </div>

                    <div className="drop_item" onClick={()=>{
                        props.close()
                        navigate(`/profile/${uid}`)
                        window.location.reload()
                    }}>
                        <div className="p-2"></div>
                        <svg t="1716530137849" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2599" width="23" height="23"><path d="M752.426667 330.666667c0-135.253333-110.08-245.333333-245.333334-245.333334s-245.333333 110.08-245.333333 245.333334c0 77.013333 35.626667 145.706667 91.306667 190.72C205.866667 582.186667 101.973333 727.04 101.76 896c0 23.466667 19.2 42.666667 42.666667 42.666667s42.666667-19.2 42.666666-42.666667c0-176.426667 143.573333-320 320-320 135.466667 0 245.333333-110.08 245.333334-245.333333zM507.093333 170.666667c88.32 0 160 71.68 160 160s-71.68 160-160 160-160-71.68-160-160S418.986667 170.666667 507.093333 170.666667zM640 618.24c0 23.466667 19.2 42.666667 42.666667 42.666667h196.906666c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667H682.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667zM879.573333 714.453333H682.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667h196.906666c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667zM879.573333 853.333333H682.666667c-23.466667 0-42.666667 19.2-42.666667 42.666667s19.2 42.666667 42.666667 42.666667h196.906666c23.466667 0 42.666667-19.2 42.666667-42.666667s-19.2-42.666667-42.666667-42.666667z" p-id="2600" fill="#707070"></path></svg>
                        <div className="p-1"></div>
                        <div className='text'>个人主页</div>
                    </div>

                    <div className="drop_item">
                        <div className="p-2"></div>
                        <svg t="1716530911727" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6084" width="23" height="23"><path d="M512.877714 841.142857l-228.205714 119.954286a73.142857 73.142857 0 0 1-106.057143-77.165714l43.52-254.025143-184.539428-179.931429a73.142857 73.142857 0 0 1 40.521142-124.708571l255.049143-37.083429L447.268571 57.051429a73.142857 73.142857 0 0 1 131.145143 0l114.102857 231.131428 255.049143 37.083429a73.142857 73.142857 0 0 1 40.521143 124.781714l-184.539428 179.931429 43.52 253.952a73.142857 73.142857 0 0 1-106.057143 77.165714L512.731429 841.142857z m212.114286-236.763428l212.041143-206.701715-293.083429-42.642285-131.072-265.508572-131.145143 265.508572-293.083428 42.642285 212.114286 206.701715-50.102858 291.913142 262.217143-137.801142 262.144 137.801142-50.102857-291.84z" fill="#707070" p-id="6085"></path></svg>
                        <div className="p-1"></div>
                        <div className='text'>我的收藏</div>
                    </div>

                    <div className="drop_title" style={{alignContent:'center'}}>
                        <div className="p-2"></div>
                        <svg t="1716532510070" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8523" width="23" height="23"><path d="M544.2 957c-7 0-14 0-21.2-0.4C291.2 946.2 97.6 759.6 81.4 532c-14-195.4 99-378 281-454.4 51.8-21.6 79-5 90.6 7 11.6 11.6 27.8 38.4 6.2 87.8-19 43.8-28.6 90.6-28.2 138.6 0.8 183.4 153.2 339 339 346.4 27 1.2 53.4-0.8 79-5.4 54.6-10 77.4 12 86 26 8.6 14 18.6 44.2-14.4 89-87.6 120-227 190-376.4 190zM143 527.4c14 197 182.2 358.4 382.4 367.2 136.2 6.6 265.4-55.4 344.8-164 6.2-8.6 9.2-15 10.4-18.2-3.8-0.4-10.4-0.8-20.6 1.2-30.2 5.4-61.6 7.4-92.8 6.2-218.6-8.6-397.4-192-398.6-408.2 0-57.2 11.2-112.2 34-164 4.2-9.2 5-15.4 5.4-18.6-3.8 0-10.4 0.8-21.2 5.4-157.6 66.4-255.4 224.4-243.8 393z" p-id="8524" fill="#707070"></path></svg>
                        <div className="p-1"></div>
                        <div className='text'>夜间模式</div>
                        
                        <div className="ps-4" ></div>
                        <div style={{height:'20px',width:'40px', alignContent:'center'}} className="switch">
                            <div style={{height:'5px',width:'1px'}}></div>
                            <input style={{height:'30px',width:'50px'}} type="checkbox" id="switch-1" className="switch-input"/>
                            <label style={{height:'30px',width:'50px'}} htmlFor="switch-1" className="switch-label"></label>
                        </div>

                    </div>

                    <div className="drop_item" >
                        <div className="p-2"></div>
                        <svg t="1716530509896" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4990" width="23" height="23"><path d="M512 305.318124a205.708492 205.708492 0 1 0 205.708492 205.708492 205.708492 205.708492 0 0 0-205.708492-205.708492z m0 346.200254a140.816223 140.816223 0 1 1 140.816223-140.816223 140.816223 140.816223 0 0 1-140.816223 141.140684z" fill="#707070" p-id="4991"></path><path d="M958.78327 393.57161l-73.003802-11.031686a391.949303 391.949303 0 0 0-16.87199-40.882129l44.126743-60.025349a64.892269 64.892269 0 0 0 0-91.82256l-77.2218-77.870723a64.892269 64.892269 0 0 0-91.82256 0L684.937896 155.741445a392.273764 392.273764 0 0 0-40.882129-17.196451L632.69962 64.892269a64.892269 64.892269 0 0 0-64.892269-64.892269h-109.343473a64.892269 64.892269 0 0 0-64.892268 64.892269l-11.031686 72.679341a392.598226 392.598226 0 0 0-40.882129 16.871989L281.307985 110.316857a64.892269 64.892269 0 0 0-91.82256 0L111.939163 187.863118a64.892269 64.892269 0 0 0 0 91.82256l44.126743 60.025349a392.273764 392.273764 0 0 0-16.547528 39.908745L64.892269 389.353612a64.892269 64.892269 0 0 0-64.892269 64.892269v109.667934a64.892269 64.892269 0 0 0 64.892269 64.892269l74.301647 11.356147a392.273764 392.273764 0 0 0 16.223068 41.20659L110.316857 742.367554a64.892269 64.892269 0 0 0 0 91.82256l77.546261 77.546261a64.892269 64.892269 0 0 0 91.82256 0l60.674271-44.775665a392.598226 392.598226 0 0 0 39.259823 16.547528l11.356147 75.599493a64.892269 64.892269 0 0 0 64.892269 64.892269h109.667934a64.892269 64.892269 0 0 0 64.892268-64.892269l11.356147-74.301647a392.922687 392.922687 0 0 0 39.584284-16.223068l61.323194 45.100127a64.892269 64.892269 0 0 0 91.82256 0l77.546262-77.546261a64.892269 64.892269 0 0 0 0-91.82256l-44.126743-60.025349a392.273764 392.273764 0 0 0 16.87199-39.908745l74.626109-11.356147a64.892269 64.892269 0 0 0 64.892268-64.892269v-109.667934a64.892269 64.892269 0 0 0-65.541191-64.892268z m0 174.560202h-9.73384l-74.626109 11.356147-38.286439 5.840305-12.978454 36.33967a329.328264 329.328264 0 0 1-13.951837 32.446134l-17.196452 35.366287 23.361217 32.446134 44.126743 60.025349 2.920152 3.893536 3.569075 3.569075-77.546261 78.195183-3.569075-3.569074-3.893536-2.920152-61.323194-45.100127-32.446135-23.036756-33.743979 18.169836a329.652725 329.652725 0 0 1-32.446135 13.627376l-36.988593 12.978454-6.489227 38.286438-11.356147 74.301648v9.73384h-110.316856V949.04943l-11.356147-75.599493-5.840305-38.286439-36.664131-12.978454a329.003802 329.003802 0 0 1-32.446135-13.627376l-35.366286-16.87199-32.446135 23.036755-60.674271 44.775666-3.893536 2.920152-3.569075 3.569075-77.546261-77.546261 3.569075-3.569075 2.595691-3.893536 45.424588-61.323194 23.036755-32.446135-16.87199-35.041825a329.328264 329.328264 0 0 1-13.627376-32.446134L187.538657 584.030418l-38.6109-6.489227-74.301648-11.356147H64.892269V454.245881h9.73384l74.626109-11.356147 38.6109-5.840304 12.978454-36.664132a329.328264 329.328264 0 0 1 13.951837-32.446135l16.87199-35.041825-23.036755-32.446134-44.451204-59.376426L162.230672 237.181242l-4.217998-3.569075 77.2218-77.546261 3.569075 3.569075 3.893536 2.595691 60.34981 44.775665 32.446134 23.036756 35.041825-16.87199a329.003802 329.003802 0 0 1 34.068441-14.276299l36.988593-12.978454 5.840305-38.6109 10.058301-72.679341V64.892269h110.316857v9.73384l11.356147 73.652725 4.86692 38.286438 36.664132 12.978454a329.003802 329.003802 0 0 1 34.392902 14.276299l35.366287 17.196452 32.446134-23.361217 59.376426-43.47782 4.217998-1.946768 3.569074-3.569075 77.546261 77.546261-3.569074 3.569075-2.920152 3.893536-44.451204 59.376426-23.036756 32.446134 17.520913 33.74398a328.679341 328.679341 0 0 1 13.951837 34.068441l12.653993 36.988593 38.935361 5.840304 73.003802 11.031686h9.733841z" fill="#707070" p-id="4992"></path></svg>
                        <div className="p-1"></div>
                        <div className='text'>设置</div>
                    </div>

                    <hr />

                    <div className="drop_item" onClick={()=>{
                        dispatch(logout());
                        
                        props.logout()
                    }}>
                        <div className="p-2"></div>
                        <svg t="1716530368687" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3762" width="23" height="23"><path d="M668 720c-19.1 0-34.7 15.5-34.7 34.7v86.7c0 9.6-7.8 17.3-17.3 17.3H182.7c-9.6 0-17.3-7.8-17.3-17.3V182.7c0-9.6 7.8-17.3 17.3-17.3H616c9.6 0 17.3 7.8 17.3 17.3v86.7c0 19.1 15.5 34.7 34.7 34.7 19.1 0 34.7-15.5 34.7-34.7v-86.7c0-47.8-38.9-86.7-86.7-86.7H182.7C134.9 96 96 134.9 96 182.7v658.7c0 47.8 38.9 86.7 86.7 86.7H616c47.8 0 86.7-38.9 86.7-86.7v-86.7c0-19.2-15.6-34.7-34.7-34.7z" p-id="3763" fill="#707070"></path><path d="M917.7 487.5L767.9 340.4c-13.8-13.5-36.1-13.5-49.9 0a34.173 34.173 0 0 0 0 49l89.5 87.9H460.6c-19.5 0-35.3 15.5-35.3 34.7 0 19.1 15.8 34.7 35.3 34.7h346.9L718 634.6a34.173 34.173 0 0 0 0 49c6.9 6.8 15.9 10.2 25 10.2 9 0 18.1-3.4 25-10.2l149.7-147.1c13.7-13.5 13.7-35.5 0-49z" p-id="3764" fill="#707070"></path></svg>
                        <div className="p-1"></div>
                        <div className='text'>退出登录</div>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default forwardRef(AvatarDropdown);