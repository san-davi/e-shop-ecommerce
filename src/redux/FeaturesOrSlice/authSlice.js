import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    isLoggedIn: false,
    email: null,
    userName: null,
    userID: null,

}

// ACTION FOR ACTIVE USER(A NAME ON PROFILE>)
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) =>{
            // console.log(action.payload)

            const {email, userName, userID} = action.payload
            state.isLoggedIn = true;
            state.email = email
            state.userName = userName
            state.userID = userID
        },

        // REMOVING USER WEN LOG OUT ON A DEVICE
        REMOVE_ACTIVE_USER: (state, action)=>{
            state.isLoggedIn = false;
            state.email = null
            state.userName = null
            state.userID = null
            // console.log(state.isLoggedIn)

        }
    }
})

export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions

export const selectIsLoggedIn = (state)=> state.auth.isLoggedIn
export const selectEmail = (state)=> state.auth.email
export const selectUserName = (state)=> state.auth.userName
export const selectUserID = (state)=> state.auth.userID

export default authSlice.reducer