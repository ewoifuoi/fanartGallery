import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const authStore = createSlice({
    name:"auth",
    // 初始化时 : 先从本地浏览器中找 token
    initialState: {
        isLoggedIn:false,
        token: localStorage.getItem('token') || ''
    },
    // 同步修改方法
    reducers:{
        login(state,action) {
            state.isLoggedIn = true; 
            state.token = action.payload;
            console.log("权限校验通过")
            // 本地浏览器存一份
            localStorage.setItem('token',action.payload);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = '';
            localStorage.setItem('token','');
        },
    }


})



// 解构出 actionCreator
const {login, logout} = authStore.actions;
// 获取reducer函数
const authReducer = authStore.reducer;

export {login, logout};
export default authReducer;