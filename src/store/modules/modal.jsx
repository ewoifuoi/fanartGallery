import {createSlice} from '@reduxjs/toolkit'

const modalStore = createSlice({
    name:"modalState",
    initialState:{
        modalState:0,
        refresh:false,
        currentList:0
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
        showUploadModal(state) {
            state.modalState = 3;
        },
        refresh(state){
            if(state.refresh == true) {
                state.refresh = false;
            }
            else {
                state.refresh = true;
            }
        },
        changeCurrentList(state, action) {
            state.currentList = action.payload;
        }
    }
})

const {showLoginModal, showSigninModal, closeModal, refresh, changeCurrentList, showUploadModal} = modalStore.actions;
const modalReducer = modalStore.reducer;

export {showLoginModal, showSigninModal, closeModal, refresh, changeCurrentList, showUploadModal};
export default modalReducer;