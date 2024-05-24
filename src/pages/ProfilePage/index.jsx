import { useDispatch,useSelector } from "react-redux";
import store from '../../store'
import './ProfilePage.css'

const ProfilePage = () =>{

    const dispatch = useDispatch()
    const imageSrc = useSelector((state) => state.auth.avatar_url);
    const username = useSelector((state) => state.auth.username);

    return (
        <>
            <div className="p-4"></div>
            <div className="p-2"></div>
            <div className="d-flex justify-content-center">
                <div style={{width:'70%', height:'1000px'}} className="bg-success">
                    <div style={{position:'relative',width:'100%', height:'220px'}} className="bg-warning ">
                        <div className="profile_avatar">
                            <img draggable="false" src={imageSrc} alt="/images/default.png" />
                        </div>
                        <div className="username">{username}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePage;