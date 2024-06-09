import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";

const initState = {
  email: "",
  role: "",
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);

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
        role: action.payload.role,
      };
    },
    logout: () => {
      return {
        ...initState,
      };
    },
  },

  //createAsyncThunk 시 동작하는 extraReducers
  extraReducers: (builder) => {
    builder
      //완료 시
      .addCase(loginPostAsync.fulfilled, (state, action) => {
        console.log("fulfilled");
        const payload = action.payload;

        return payload;
      })
      //처리 중
      .addCase(loginPostAsync.pending, (state, action) => {
        console.log("pending");
      })
      //문제 발생시
      .addCase(loginPostAsync.rejected, (state, action) => {
        console.log("rejected");
      });
  },
});

//만들어 놓은 기능을 외부에서 호출해서 사용할 수 있게
export const { login, logout } = loginSlice.actions;

//reducer
export default loginSlice.reducer;
