import { createSlice } from "@reduxjs/toolkit";

const initState = {
  email: "",
  role: "",
};

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: initState,
  reducers: {
    login: (state, action) => {
      //state: 기존의 상태
      //action: 새로 바뀔 상태
      console.log(action);
      console.log("____________");
      console.log(action.payload);

      //앞으로 유지될 새로운 상태
      return {
        email: action.payload.email,
      };
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
