import { useState } from "react";
import { Box, Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addStreamSchema } from "../../utils/validationSchema";
import { baseURL } from "../../utils/StaticVariables";
import { snackAlertState } from "../../Recoil/RecoilState";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import SelectCustom from "../../Components/Inputs/SelectCustom";
import Holder from "../../Components/HOC/Holder";
import LoadBtn from "../../Components/Reusable/LoadBtn";
import InputTextCustom from "../../Components/Inputs/InputTextCustom";
import { useRecoilState } from "recoil";
import { authState } from "../../Recoil/RecoilState";

const AddStream = () => {
    const [authRecoil] = useRecoilState(authState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({

        initialValues: {
            name: "",
            path: "",
            type: "Video File",
        },
        onSubmit: (values) => {
            setLoading(true);
            console.log(authRecoil)
            axios.post(baseURL + "/source", {
                ...values,
                headers: {
                    Authorization: `Bearer ${authRecoil.token}` // Send token in headers

                }
            })
                .then(() => {
                    formik.handleReset()
                    showSuccess()
                })
                .catch(error => {

                    showError()
                    // showSuccess()
                })
                .finally(() => setLoading(false))

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
            <Box component="form">
                <InputTextCustom formik={formik} name="name" label="Name" placeholder="add your Stream Name" />
                <InputTextCustom formik={formik} name="path" label="Source" placeholder="add Stream Source or Stream Path" />
                <SelectCustom formik={formik} arr={["Video File", "RTSP Stream", "Webcam"]} name="type" label="type" />
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
