import { useEffect, useState } from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import SelectCustom from "../../Components/Inputs/SelectCustom";
import { useNavigate } from "react-router-dom";
import InputTextCustom from "../../Components/Inputs/InputTextCustom";
import { useFormik } from "formik";
import { addStreamSchema } from "../../utils/validationSchema";
import axios from "axios";
import { baseURL } from "../../utils/StaticVariables";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import LoadBtn from "../../Components/Reusable/LoadBtn";
const AddStream = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({

        initialValues: {
            name: "",
            path: "",
            type: "test",
        },
        validationSchema: addStreamSchema,
        onSubmit: (values) => {
            setLoading(true);
            
            axios.post(baseURL + "/stream", {
                ...values,
            })
                .then(response => {
                    console.log(response.data)
                    setLoading(false);
                    showSuccess()
                })
                .catch(error => {
                    setLoading(false);
                    showError()
                });
        },
    });


      const setSnackAlert = useSetRecoilState(snackAlertState);
    
      const showSuccess = () => {
        setSnackAlert({
          open: true,
          message: "Operation successful!",
          severity: "success",
        });
      };
    
      const showError = () => {
        setSnackAlert({
          open: true,
          message: "Something went wrong!",
          severity: "error",
        });
      };
    return (
        <Holder>
            <Box >
                <InputTextCustom formik={formik} name="name" label="Name" placeholder="add your Stream Name" />
                <InputTextCustom formik={formik} name="path" label="Source" placeholder="add Stream Source or Stream Path" />
                <SelectCustom formik={formik} arr={["test", "hi", "here"]} name="type" label="type" />
                <Stack alignItems="center" justifyContent="space-between" direction="row" mt={4}>
                    <CustomBtn isLined handle={() => navigate("/streams")}>
                        Back
                    </CustomBtn>

                    <Stack alignItems="center" justifyContent="space-between" direction="row" gap={2}>
                        <CustomBtn isLined handle={formik.handleReset}>
                            Clear
                        </CustomBtn>
                       < LoadBtn loading={loading} handle={formik.handleSubmit} />
                      
                    </Stack>

                </Stack>
            </Box>
        </Holder>
    );
};

export default AddStream;
