import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slice/loginSlice";
import useCustomMove from "../../hooks/useCustomMove";

function KakaoRedirectPage() {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { navigate } = useCustomMove();

  const authCode = searchParams.get("code");

  useEffect(() => {
    getAccessToken(authCode).then((data) => {
      const accessToken = data;

      getMemberWithAccessToken(accessToken).then((memberInfo) => {
        dispatch(login(memberInfo)); //loginSlice -> login()

        if (memberInfo && memberInfo.social) {
          navigate("/");
        } else {
          navigate("/");
        }
      });
    });
  }, [authCode]);
  return (
    <div>
      <div>Kakao Login Redirect</div>
    </div>
  );
}

export default KakaoRedirectPage;
