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

                <div className="container_box bg-success" style={{width:'95%', height:'1000px'}}>
                    
                    <div className="bg-warning background_img">
                        <img style={{width:'100%'}} src="/images/default_background.jpg" alt="/images/default_background.jpg" />
                    </div>
                    <div className=" card_box">
                        <div className="card_box_inner">
                            <div className="profile_avatar">
                                <img draggable="false" src={imageSrc} alt="/images/default.png" />
                            </div>
                            <div className="username">{username}</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ProfilePage;