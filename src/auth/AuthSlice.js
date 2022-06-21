import { createSlice } from "@reduxjs/toolkit";
import Cookie from "../util/Cookie";

const accessToken = Cookie.getItem("s8acctkn");
const isLogin = sessionStorage.getItem("s8lgn");

const initialState = {
  value: {
    accessToken,
    isLogin,
    // role,
  },
};

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.value = action.payload.value;
    },
  },
});

export const { userLogin } = AuthSlice.actions;
export default AuthSlice.reducer;

//
