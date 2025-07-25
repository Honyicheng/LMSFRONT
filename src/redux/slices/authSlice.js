import { createSlice } from "@reduxjs/toolkit";
import  {getToken, setToken as _setToken, clearToken as _clearToken} from "../slices/token"; // 导入token相关操作

const initialState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
       _setToken(action.payload); // 使用setToken函数存储token
      
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      _clearToken(); // 清除token
    },
  },
});
export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
