import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { loginPostAsync, logout } from "../slice/loginSlice";

const useCustomLogin = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.loginSlice);

  const isLogin = loginState.email ? true : false; //------로그인 여부

  //로그인 함수
  const doLogin = async (loginParam) => {
    const action = await dispatch(loginPostAsync(loginParam));

    return action.payload;
  };

  //로그아웃 함수
  const doLogout = () => {
    dispatch(logout());
  };

  //페이지 이동
  const moveToPath = (path) => {
    navigate({ pathname: path }, { replace: true });
  };

  //로그인 페이지로 이동
  const moveToLogin = () => {
    navigate({ pathname: "/member/login" }, { replace: true });
  };

  //로그인 페이지로 이동 컴포넌트
  const moveToLoginReturn = () => {
    return <Navigate replace to="/member/login" />;
  };

  //이전페이지 이동
  const moveToBack = () => {
    navigate(-1);
  };

  return {
    loginState,
    isLogin,
    doLogin,
    doLogout,
    moveToPath,
    moveToLogin,
    moveToLoginReturn,
    moveToBack,
  };
};
export default useCustomLogin;
