import { useEffect, useState, useRef } from "react";
import Alerts from "../../components/Alerts";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../ProfilePage/ProfilePage.css'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentList, refresh } from "../../store/modules/modal";
import './ProfileFollowers.css'


const Profile_followers = () => {
    const r = useSelector((state=>state.modal.refresh));
    const params = useParams()
    let uid = params.uid
    const alertRef = useRef(null)
    const [data, setData] = useState([]);
    const [userElements, setUserElements] = useState([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

    const dispatch = useDispatch()

    const checkWatcher = async (uid) => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/hasWatched/${uid}`,{
                headers:{
                    'Content-Type':"application/json",
                    'Authorization':`${localStorage.getItem('token')}`,
                }
            });
            if(response.status == 200) {
                return response.data;
            }
        }
        catch(error) {
            const errorMessage = error.response ? error.response.data : '用户数据请求失败';
            alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
    }

    const fetch_following_list = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/user/followers/${uid}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.status == 200) {
                setData(response.data)
            }
        }
        catch(error) {
            alertRef.current.showAlert({type:'danger', msg:`获取用户作品失败:${error}`})
        }
        finally {

        }
    }

    const follow = async (uid) => {
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
            alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
      }

      const unfollow = async (uid) => {
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
            alertRef.current.showAlert({ type: 'danger', msg: errorMessage });
        }
      }

    const render = async () => {
        setLoading(true);
        let elements = [];
        for (let i = 0; i < data.length; i++) {
            const user = data[i];
            let hasWatched = false;
            if(isLoggedIn) hasWatched = await checkWatcher(user.uid);
            
            elements.push(
                <div className="following_card" key={i} style={{backgroundColor:'#fff', margin:'5px 60px'}}>
                    <div  style={styles.userCard}>
                        <img draggable="false" src={user.avatar} alt="/images/default.png" style={styles.avatar} />
                        <div style={{width:'20px'}}></div>
                        <div style={styles.userInfo}>
                            <h3 style={styles.username}>{user.name}</h3>
                            <div style={{height:'5px'}}></div>
                            <p style={styles.email}>{user.email}</p>
                        </div>

                        {isLoggedIn && <a style={{marginLeft:'auto'}} className="custom-button" onClick={()=>{
                             if(hasWatched) {
                                unfollow(user.uid);
                             }
                             else {
                                follow(user.uid);
                             }
                        }}>
                            <div className="d-flex" style={{alignContent:'center', justifyContent:'center'}}>
                                {hasWatched && (<div> 取消关注</div>)}
                                {!hasWatched && (<div> 关注</div>)}
                            </div>
                        </a>}
                    </div>
                </div>
            );
        }
        setUserElements(elements);
    }

    useEffect(()=>{
        fetch_following_list();
        dispatch(changeCurrentList(3));
    }, [])

    useEffect(() => {
        if (r) {
            fetch_following_list();
            dispatch(refresh())
        }
    }, [r]);

    useEffect(()=>{
        render();
    }, [data, isLoggedIn])

    useEffect(()=>{
        setLoading(false);
    },[userElements])

    const styles = {
        userCard: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
            padding: '15px',
            borderRadius: '10px',
            margin : '8px 70px'
        },
        avatar: {
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            marginRight: '10px',
        },
        userInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        username: {
            margin: 0,
            fontSize: '25px',
            fontWeight: 'bold'
        },
        email: {
            margin: 0,
            fontSize: '14px',
            fontWeight:'bold',
            color: '#AAA'
        }
    };

    return (
        <>
            {loading && (
                <div className="d-flex justify-content-center" style={{ width: '87vw', height: '120vh' }}>
                    <Loading />
                </div>
            )}
            <Alerts ref={alertRef}/>
            <div style={{height:'auto'}}>
                {userElements}
            </div>
            <div style={{height:'50px'}}></div>
        </>
    )
}

export default Profile_followers;