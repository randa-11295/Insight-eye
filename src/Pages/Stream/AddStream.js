import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";

const AddStream = () => {
    const navigate = useNavigate();

    return (
        <Holder 
      
        >
            <Box >
                add stream
            </Box>
        </Holder>
    );
};

export default AddStream;
