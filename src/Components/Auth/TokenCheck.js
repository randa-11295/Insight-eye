// src/Components/Auth/TokenCheck.tsx
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import { useNavigate } from "react-router-dom"; // or `useRouter` if you're using Next.js

const TokenCheck = () => {
  const authRecoil = useRecoilValue(authState);
  const resetAuth = useResetRecoilState(authState);
  const navigate = useNavigate(); // or `const router = useRouter();`

  useEffect(() => {
    const expire = authRecoil?.expire;

    if (expire) {
      const expireDate = new Date(expire).getTime(); // if in ms
      const now = new Date().getTime();

    

      if (now > expireDate) {
        
        localStorage.removeItem("token");
        localStorage.removeItem("expire");
        resetAuth();
        navigate("/login");
      } 
    }
  }, [authRecoil?.expire, navigate, resetAuth]);

  return null;
};

export default TokenCheck;
