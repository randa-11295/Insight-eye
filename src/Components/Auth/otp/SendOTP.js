import AuthContentReusable from "../AuthContentReusable";

const SendOTP = (props) => {
  return (
 
      <AuthContentReusable
        formik={props.formik}
        title="Send OTP"
        btnText={"Send OTP Code"}
        des="OTP to your account  to access all features in INSIGHT EYE"
        // contentRoute={{ linkText: " Forget your password ?", route: "/" }}
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
