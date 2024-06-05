
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './modules/auth'
import modalReducer from "./modules/modal";

export default configureStore({
    reducer:{
        auth:authReducer,
        modal:modalReducer
    }
})