import AuthContentReusable from "../AuthContentReusable";

const SendOTP = (props) => {
  return (
    <AuthContentReusable
      formik={props.formik}
      title="Verify OTP"
      btnText={"verify OTP Code"}
      des="verify to your account  to access all features in INSIGHTEYE"
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
