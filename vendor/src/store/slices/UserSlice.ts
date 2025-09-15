import { createSlice } from "@reduxjs/toolkit";


const initialAdmin = localStorage.getItem('user');
const parsedAdmin = initialAdmin ? JSON.parse(initialAdmin) : null;
const initialAuthenticate = localStorage.getItem('Authenticate') === "true";

interface Admin {
  id: string;
  email?: string;
  profilePic: string;
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

    loginSuccess(state, action:any) {
      state.isAuthenticated = true;
      state.user = action.payload?.vendor || null;
      localStorage.setItem("user", JSON.stringify(action.payload?.vendor));
      localStorage.setItem("Authenticate", JSON.stringify(true));
      localStorage.setItem("token", action.payload?.token);
    },

    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("Authenticate");
      localStorage.removeItem("token");
    },
  },
});

export const  {loginSuccess, logoutSuccess} = userSlice.actions;

export default userSlice.reducer;