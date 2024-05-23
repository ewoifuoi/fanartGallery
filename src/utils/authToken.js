import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import store from "../store";
import {update, logout} from '../store/modules/auth'

// 使用原本的token申请新的token
const refreshToken = async (dispatch) => {
    try {
        let response = await axios.get("http://124.221.8.18:8080/user/refresh",{
            headers:{
                'Authorization':`${localStorage.getItem('token')}`,
                'Content-Type':"application/json",
            }
        });
        if(response.status == 200) {
            let token = response.data.token;
            dispatch(update(token))
        }
    }
    catch (error) {
        dispatch(logout())
        console.log(error)
        console.log("token失效")
    }
    finally {

    }
}

export default refreshToken;