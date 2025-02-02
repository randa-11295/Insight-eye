import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box, Stack } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import SelectCustom from "../../Components/Inputs/SelectCustom";
import { useNavigate } from "react-router-dom";
import InputTextCustom from "../../Components/Inputs/InputTextCustom";
import { useFormik } from "formik";
import { addStreamSchema } from "../../utils/validationSchema";

const AddStream = () => {
    
    const navigate = useNavigate();
    const formik = useFormik({

        initialValues: {
            name: "",
            src: "",
            type: "1",
        },
        // validationSchema: addStreamSchema,
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <Holder>
            <Box >
                <InputTextCustom formik={formik} name="name" label="Name" placeholder="add your Stream Name" />
                <InputTextCustom formik={formik} name="src" label="Source" placeholder="add Stream Source or Stream Path" />
                <SelectCustom formik={formik} arr={["1", "2", "3"]} name="type" label="type" />
                <Stack alignItems="center" justifyContent="space-between" direction="row" mt={4}>
                    <CustomBtn isLined handle={() => navigate("/streams")}>
                        Back
                    </CustomBtn>

                    <Stack alignItems="center" justifyContent="space-between" direction="row" gap={2}>
                        <CustomBtn isLined handle={formik.handleReset}>
                            Clear
                        </CustomBtn>
                        <CustomBtn handle={formik.handleSubmit}>
                            Conform
                        </CustomBtn>
                    </Stack>

                </Stack>
            </Box>
        </Holder>
    );
};

export default AddStream;
