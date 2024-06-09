import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
  role: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: () => {
      console.log("login....");
    },
    logout: () => {
      console.log("logout...");
    },
  },
});

//만들어 놓은 기능을 외부에서 호출해서 사용할 수 있게
export const { login, logout } = loginSlice.actions;

//reducer
export default loginSlice.reducer;
