import AuthContentReusable from "../AuthContentReusable";

const SendOTP = (props) => {
  return (
    <AuthContentReusable
      formik={props.formik}
      title="Send OTP"
      btnText={"Send OTP Code"}
      des="OTP to your account  to access all features in INSIGHT EYE"
      contentRoute={{ linkText: " Back to login ", route: "/login" }}
      loading={props.loading}
      footerRoute={{
        title: "  New user ?",
        linkText: "Contact us",
        route: "/contact",
      }}
    />
  );
};

export default SendOTP;
