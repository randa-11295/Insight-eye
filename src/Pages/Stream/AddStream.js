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
          path: "",
          type: "",
        },
        // validationSchema: addStreamSchema,
        onSubmit: (values) => {
         console.log(values);
        },
      });
      
    return (
        <Holder>
            <Box >
                <InputTextCustom name="name" label="Name" placeholder="add your Stream Name" formik={formik} />
                <InputTextCustom />
                <InputTextCustom />
                {/* <SelectCustom /> */}
                <Stack alignItems="center" justifyContent="space-between" direction="row" >
                    <CustomBtn isLined handle={()=>navigate("/streams")}>
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
