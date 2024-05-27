import { useEffect, useState, useRef } from "react";
import Display from "../../components/Display";
import Alerts from "../../components/Alerts";
import axios from "axios";
import { useParams } from "react-router-dom";


const Profile_works = () => {
    const [data, setData] = useState('')
    const alertRef = useRef(null)
    
    const params = useParams()
    let uid = params.uid

    // 获取作品总数
    const fetch_total_pages = async () => {
        try {
            let response = await axios.get(`http://124.221.8.18:8080/search/works/${uid}`,{
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
    }
    useEffect(()=>{
        fetch_total_pages();
    },[])

    
    return (
        <>
            <Alerts ref={alertRef}/>
            <div className="" style={{height:'1000px'}}>
                <div className="d-flex">
                    <div style={{width:'100px'}}></div>
                    <Display data={data}/>
                </div>
            </div>
        </>
    )
}

export default Profile_works;