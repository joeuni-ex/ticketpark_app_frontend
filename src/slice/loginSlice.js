import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../util/cookieUtil";

const initState = {
  email: "",
  role: "",
};

//로그인 중인 유저 토큰 가져오기(쿠키)
export const loadMemberCookie = () => {
  const memberInfo = getCookie("member");

  return memberInfo;
};

export const loginPostAsync = createAsyncThunk("loginPostAsync", (param) =>
  loginPost(param)
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: loadMemberCookie() || initState,
  reducers: {
    login: (state, action) => {
      //state: 기존의 상태
      //action: 새로 바뀔 상태
      //console.log(action);
      //console.log("____________");
      console.log(action.payload);

      setCookie("member", JSON.stringify(action.payload), 1);

      //앞으로 유지될 새로운 상태
      return {
        email: action.payload.email,
        roleNames: action.payload.roleNames[0],
      };
    },
    logout: () => {
      removeCookie("member");
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

        //쿠키 저장
        if (!payload.error) {
          setCookie("member", JSON.stringify(payload), 1);
        }

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
