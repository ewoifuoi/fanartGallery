import { useDispatch, useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import './ProfilePage.css'
import { useEffect, useState , useRef} from "react";
import axios from "axios";
import Alerts from "../../components/Alerts";

const ProfilePage = () => {

    const dispatch = useDispatch()
    const imageSrc = useSelector((state) => state.auth.avatar_url);

    const alertRef = useRef(null);

    const params = useParams()
    let uid = params.uid

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [workscount, setWorkscount] = useState('');
    const [followingcount, setFollowingcount] = useState('');
    const [followerscount, setFollowercount] = useState('')
    const [likecount, setLikecount] = useState('');
    const [avatarLink, setAvatarLink] = useState('/images/default.png')

    const fetchData = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/profile/${uid}`,{
                headers:{
                    'Content-Type':"application/json"
                }
            });
            
            if(response.status == 200) {
                
                let {username,email,workscount,followerscount,followingcount,likecount} = response.data;

                setUsername(username);setEmail(email);setWorkscount(workscount);
                setFollowingcount(followingcount);setFollowercount(followerscount);setLikecount(likecount);
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
    }

    const fetchAvatar = async () => {
        try {
          let response = await axios.get(`http://124.221.8.18:8080/user/avatar/${uid}`,{
            responseType:'blob',
            params: {
              timestamp: Date.now() // 添加随机参数
            }
          });
          setAvatarLink(URL.createObjectURL(response.data))
          
        } catch(error) {
          alertRef.current.showAlert({type:'danger',msg:`${error}`});
        }
      }

    useEffect(()=>{
        fetchData();
        fetchAvatar();
    },[])

    return (
        
        <>
            <div className="p-4"></div>
            <div className="p-2"></div>
            <div className="d-flex justify-content-center">

                <div className="container_box" style={{ width: '96%', height: '1000px', minWidth:'1440px' }}>

                    <div className="bg-warning background_img">
                        <img style={{ width: '100%' }} src="/images/default_background.jpg" alt="/images/default_background.jpg" />
                    </div>
                    <div className=" card_box">
                        <div className="card_box_inner">
                            <div className="user_info">
                                <div className="profile_avatar">
                                    <img style={{ width: '100%' }} draggable="false" src={avatarLink} alt="/images/default.png" />
                                </div>
                                <div className="p-2"></div>
                                <div>
                                    <div style={{height:'80px'}}></div>
                                    <div className="username">{username}</div>
                                    <div className="email">{email}</div>
                                </div>
                                <div style={{width:'490px'}}></div>
                                <div className="d-flex">
                                    <div>
                                        <div style={{height:'85px',width:'10px'}}></div>
                                        <div className="text3" style={{textAlign:'center'}}>{workscount}</div>
                                        <div className="text2">作品数</div>
                                    </div>
                                    <div className="p-3"></div>
                                    <div className="p-1"></div>
                                    <div>
                                        <div style={{height:'85px',width:'10px'}}></div>
                                        <div className="text3" style={{textAlign:'center'}}>{followingcount}</div>
                                        <div className="text2">关注</div>
                                    </div>
                                    <div className="p-3"></div>
                                    <div className="p-1"></div>
                                    <div>
                                        <div style={{height:'85px',width:'10px'}}></div>
                                        <div className="text3" style={{textAlign:'center'}}>{followerscount}</div>
                                        <div className="text2">粉丝</div>
                                    </div>
                                    <div className="p-3"></div>
                                    <div className="p-1"></div>
                                    <div>
                                        <div style={{height:'85px',width:'10px'}}></div>
                                        <div className="text3" style={{textAlign:'center'}}>{likecount}</div>
                                        <div className="text2">获赞</div>
                                    </div>
                                </div>

                                

                            </div>
                            <div className="d-flex" id="button_box">

                                <div className="d-flex">
                                    <div className="nav_title">作品</div>
                                    <div className="nav_title">收藏</div>
                                    <div className="nav_title">关注列表</div>
                                    <div className="nav_title">粉丝列表</div>
                                </div>

                                <div style={{width:'500px'}}></div>

                                <a className="custom-button">
                                    <div className="d-flex" style={{alignContent:'center', justifyContent:'center'}}>
                                        <svg t="1716553162486" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6543" width="23" height="23"><path d="M914.285714 73.142857h-804.571428C51.2 73.142857 0 124.342857 0 182.857143v585.142857c0 58.514286 51.2 109.714286 109.714286 109.714286h804.571428c58.514286 0 109.714286-51.2 109.714286-109.714286v-585.142857c0-58.514286-51.2-109.714286-109.714286-109.714286z m-804.571428 73.142857h804.571428L563.2 497.371429c-14.628571 14.628571-29.257143 21.942857-51.2 21.942857s-36.571429-7.314286-51.2-21.942857L109.714286 146.285714zM73.142857 782.628571V212.114286l285.257143 285.257143L73.142857 782.628571z m80.457143 21.942858l256-256c29.257143 29.257143 65.828571 43.885714 102.4 43.885714s73.142857-14.628571 102.4-43.885714l43.885714-43.885715-43.885714 43.885715 256 256H153.6z m797.257143-36.571429v14.628571L665.6 497.371429 950.857143 212.114286v555.885714z" p-id="6544" fill="#fff"></path></svg>
                                        <div style={{width:'9px'}}></div>
                                        <div>私信</div>
                                    </div>
                                </a>
                                <div style={{width:'30px'}}></div>
                                <a className="custom-button">
                                    <div className="d-flex" style={{alignContent:'center', justifyContent:'center'}}>
                                        <svg t="1716552985086" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2592" width="26" height="23"><path d="M469.333333 469.333333V170.666667h85.333334v298.666666h298.666666v85.333334h-298.666666v298.666666h-85.333334v-298.666666H170.666667v-85.333334h298.666666z" fill="#fff" p-id="2593"></path></svg>
                                        <div style={{width:'4px'}}></div>
                                        <div>关注</div>
                                    </div>
                                </a>
                            </div>
                            <div className="p-5"></div>
                            <div className="p-5"></div>
                            <hr />

                        </div>
                    </div>
                </div>
            </div>
            {/* 提示消息列表 */}
            <Alerts ref={alertRef}/>
        </>
    )
}

export default ProfilePage;