import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios';
import { useDispatch } from 'react-redux';

const authStore = createSlice({
    name:"auth",
    // 初始化时 : 先从本地浏览器中找 token
    initialState: {
        isLoggedIn:false,
        token: localStorage.getItem('token') || '',
        username:'',
        email:'',
        avatar_url:'/images/default.png'
    },
    // 同步修改方法
    reducers:{
        login(state,action) {
            state.isLoggedIn = true; 
            let {token, username, email} = action.payload;
            
            state.token = token;
            state.email = email;
            state.username = username;
            console.log("权限校验通过")
            // 本地浏览器存一份
            localStorage.setItem('token',action.payload.token);
        },
        logout(state) {
            state.isLoggedIn = false;
            state.token = '';
            state.username='';state.email='';state.avatar_url='/images/default.png';
            localStorage.setItem('token','');
        },
        set_avatar(state, action) {
            state.avatar_url = action.payload;
        },
        update(state, action) {
            state.isLoggedIn = true; 
            state.token = action.payload;
            localStorage.setItem('token',action.payload);
        }
    }
})

// 解构出 actionCreator
const {login, logout, set_avatar, update} = authStore.actions;
// 获取reducer函数
const authReducer = authStore.reducer;

export {login, logout, set_avatar, update};
export default authReducer;