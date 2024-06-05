import {createSlice} from '@reduxjs/toolkit'

const modalStore = createSlice({
    name:"modalState",
    initialState:{
        modalState:0
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
        }
    }
})

const {showLoginModal, showSigninModal, closeModal} = modalStore.actions;
const modalReducer = modalStore.reducer;

export {showLoginModal, showSigninModal, closeModal};
export default modalReducer;