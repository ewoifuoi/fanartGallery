import { useEffect, useState, useRef } from "react";
import Alerts from "../../components/Alerts";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../ProfilePage/ProfilePage.css'
import Loading from '../../components/Loading'
import { useDispatch, useSelector } from "react-redux";
import { changeCurrentList, refresh } from "../../store/modules/modal";
import Display from "../../components/Display";


const Profile_favoriates = () => {

    const dispatch = useDispatch();
    const [data, setData] = useState('')
    const alertRef = useRef(null)
    
    const params = useParams()
    let uid = params.uid

    const fetch_total_pages = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/search/favorites/${uid}`,{
                headers:{
                    'Content-Type':'application/json'
                }
            });
            if(response.status == 200) {
                setData(response.data)
            }
        }
        catch(error) {
            alertRef.current.showAlert({type:'danger', msg:`获取用户作品失败:${error.response.data.detail}`})
        }
    }

    useEffect(()=>{
        dispatch(changeCurrentList(1));
        fetch_total_pages();
    }, [])

    return (
        <>
            <Alerts ref={alertRef}/>
            <div className="" style={{height:'auto'}}>
                <div className="d-flex">
                    <div style={{width:'100px'}}></div>
                    <Display data={data}/>
                </div>
            </div>
        </>
    )
}

export default Profile_favoriates;