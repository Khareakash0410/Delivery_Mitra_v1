import { createSlice } from "@reduxjs/toolkit";


const initialAdmin = localStorage.getItem('user');
const parsedAdmin = initialAdmin ? JSON.parse(initialAdmin) : null;
const initialAuthenticate = localStorage.getItem('Authenticate') === "true";

interface Admin {
  id: string;
  name?: string;
  phone?: string;
  role: string;
}

interface AuthState {
  user: Admin | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: parsedAdmin as Admin || null,
  isAuthenticated: initialAuthenticate || false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {

    otpVerifyLoginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload || null;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("Authenticate", JSON.stringify(true));
    },

    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("Authenticate");
    },
  },
});

export const  {otpVerifyLoginSuccess, logoutSuccess} = userSlice.actions;

export default userSlice.reducer;