import { useState, useEffect } from "react";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import SelectCustom from "../../Components/Inputs/SelectCustom";
import Holder from "../../Components/HOC/Holder";
import LoadBtn from "../../Components/Reusable/LoadBtn";
import InputTextCustom from "../../Components/Inputs/InputTextCustom";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { useRecoilValue } from "recoil";
import { authState } from "../../Recoil/RecoilState";
import * as Yup from "yup";
import { streamTypesArr } from "../../utils/StaticVariables";
import { useSnackbar } from "notistack";
const AddStream = () => {
  const { token } = useRecoilValue(authState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    console.log(token);
  }, [token]);

  const formik = useFormik({
    initialValues: {
      name: "",
      path: "",
      type: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(2, "Name must be at least 2 characters"),
      path: Yup.string().required("Path is required"),
      type: Yup.string()
        .oneOf(streamTypesArr, "Invalid type") // You can customize allowed types
        .required("Type is required"),
    }),
    onSubmit: (values) => {
      console.log("values");
      setLoading(true);
      axios
        .post(`${baseURL}source`, values, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          formik.handleReset();
          enqueueSnackbar("Your new stream added Successful", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(error?.message || "some thing want wrong", { variant: "error" });
        })
        .finally(() => setLoading(false));
    },
  });

  return (
    <Holder title="add stream">
      <Box component="form" onSubmit={formik.handleSubmit} noValidate>
        <InputTextCustom
          formik={formik}
          name="name"
          label="Name"
          placeholder="add your Stream Name"
        />
        <InputTextCustom
          formik={formik}
          name="path"
          label="Source"
          placeholder="add Stream Source or Stream Path"
        />
        <SelectCustom
          formik={formik}
          arr={streamTypesArr}
          name="type"
          label="type"
        />
        <Stack
          alignItems="center"
          justifyContent="space-between"
          direction="row"
          mt={4}
        >
          <CustomBtn isLined handle={() => navigate("/streams")}>
            Back
          </CustomBtn>

          <Stack
            alignItems="center"
            justifyContent="space-between"
            direction="row"
            gap={2}
          >
            <CustomBtn isLined handle={formik.handleReset}>
              Clear
            </CustomBtn>
            <LoadBtn loading={loading} />
          </Stack>
        </Stack>
      </Box>
    </Holder>
  );
};

export default AddStream;
