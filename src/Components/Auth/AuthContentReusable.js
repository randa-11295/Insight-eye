import InputTextCustom from "../Inputs/InputTextCustom";
import LoadBtn from "../Reusable/LoadBtn";
import { Box, Link, Typography, Stack } from "@mui/material";

const AuthContentReusable = ({
  title,
  des,
  formik,
  children,
  contentRoute,
  footerRoute,
  loading
}) => {

  return (
    <Stack justifyContent="space-around" gap={4} sx={{ height: "100%" }}>
      <Box>
        <Typography
          variant="h4"
          sx={{
            fontSize: "3rem",
            fontWeight: "bold",
            color: "primary.main",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mt: 1,
          }}
        >
          {des}
        </Typography>
      </Box>

      <Box component="form" onSubmit={formik.handleSubmit}>
        {Object.keys(formik.initialValues).map((fieldName) => (
          <InputTextCustom
            key={fieldName}
            label={fieldName}
            placeholder={`Enter your ${fieldName}`}
            type={fieldName === "password" ? "password" : "text"}
            formik={formik}
            name={fieldName}
            value={formik.values[fieldName]}
            onChange={formik.handleChange}
          />
        ))}

        <LoadBtn
          submit
          fullWidth
          text={"Send"}
          handle={() => formik.handleSubmit()}
          loading={loading}
        />

        <Link
          component="span"
          underline="hover"
          sx={{
            cursor: "pointer",
            padding: "20px",
            display: "block",
            textAlign: "center",
          }}
        >
          {contentRoute.linkText}
        </Link>
      </Box>

      <Typography sx={{ textAlign: "center" }}>
        {footerRoute.title}
        <Link
          component="span"
          underline="hover"
          sx={{ cursor: "pointer", padding: "10px" }}
        >
          {footerRoute.linkText}
        </Link>
      </Typography>
    </Stack>
  );
};

export default AuthContentReusable;
