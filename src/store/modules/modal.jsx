import {createSlice} from '@reduxjs/toolkit'

const modalStore = createSlice({
    name:"modalState",
    initialState:{
        modalState:0,
        refresh:false
    },
    reducers:{
        showLoginModal(state) {
            state.modalState = 1;
        },
        showSigninModal(state) {
            state.modalState = 2;
        },
        closeModal(state) {
            state.modalState = 0;
        },
        refresh(state){
            if(state.refresh == true) {
                state.refresh = false;
            }
            else {
                state.refresh = true;
            }
        }
    }
})

const {showLoginModal, showSigninModal, closeModal, refresh} = modalStore.actions;
const modalReducer = modalStore.reducer;

export {showLoginModal, showSigninModal, closeModal, refresh};
export default modalReducer;