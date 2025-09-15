import { createSlice } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";
import type { User } from "../../types/User";


const initalUser = localStorage.getItem("user");
const parsedUser = initalUser ? JSON.parse(initalUser) : null;
const initialAuthenticate = localStorage.getItem('authenticate') === "true";


interface AuthState {
   user: User | null;
   isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: parsedUser as User || null,
  isAuthenticated: initialAuthenticate || false,
};



const authSlice = createSlice({
    name: "auth", 
    initialState,
    reducers: {

        verifyOtpSuccess(state, action: any) {
            state.isAuthenticated = true;
            state.user = action.payload?.user || null;
            localStorage.setItem("user", JSON.stringify(action.payload?.user));
            localStorage.setItem("authenticate", JSON.stringify(true)); 
            localStorage.setItem("token", action.payload?.token); 
        },

        veirfyLoginOtpSuccess(state, action: any) {
            state.isAuthenticated = true;
            state.user = action.payload?.user || null;
            localStorage.setItem("user", JSON.stringify(action.payload?.user));
            localStorage.setItem("authenticate", JSON.stringify(true));
            localStorage.setItem("token", action.payload?.token);
        },

        logoutSuccess (state) {
            state.isAuthenticated = false;
            state.user = null;
            localStorage.removeItem("user");
            localStorage.removeItem("authenticate");
            localStorage.removeItem("token");
        },


        resetAuthSlice (state) {
            state.user = state.user;
            state.isAuthenticated = state.isAuthenticated;
        }
    }
});



export const resetAuthSlice = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.resetAuthSlice());
};


export const {verifyOtpSuccess, veirfyLoginOtpSuccess, logoutSuccess} = authSlice.actions;


export default authSlice.reducer;