import React from "react";
import Holder from "../../Components/HOC/Holder";
import { Box } from "@mui/system";
import CustomBtn from "../../Components/Reusable/CustomBtn";
import { useNavigate } from "react-router-dom";

const Streams= () => {
    const navigate = useNavigate();

    return (
        <Holder 
            title="All Streams" 
            action={
                <CustomBtn 
                    text="Add New Stream" 
                    handle={() => navigate("/streams/add-stream")} 
                />
            }
        >
            <Box sx={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Test stream
            </Box>
        </Holder>
    );
};

export default Streams;
