import { useState } from "react";
import SendOTP from "../../Components/Auth/SendOTP";

const OTP = () => {
  const [otpSent, setOtpSent] = useState(false);

  return (
    <>
      {!otpSent && <SendOTP setOtpSent={setOtpSent} />}
      {otpSent === "sended" && "verify"}
    </>
  );
};

export default OTP;
