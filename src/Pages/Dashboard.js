import {useEffect , useState} from "react";
import { Paper, Stack } from "@mui/material";
import Holder from "../Components/HOC/Holder";
import HighlightedText from "../Components/Reusable/HighlightedText";
import {useAxiosWithAuth} from "../services/api"

const personalInfo = [
    { title: "First Name", val: "Randa" },
    { title: "Last Name", val: "Mohamed" },
    { title: "Email", val: "Randa.12@gmail.com" },
    { title: "Company Name", val: "Spacetoon" },
];

const cameraStatuses = [
    { title: "Camera 1", val: "on" },
    { title: "Camera 12", val: "off" },
    { title: "Camera 45", val: "on" },
    { title: "Camera 2334", val: "on" },
    { title: "Camera 22", val: "off" },
    { title: "Camera 34", val: "off" },
    { title: "Camera e3e", val: "on" },
    { title: "Camera 3", val: "off" },
    { title: "Camera 3", val: "on" },
];

const systemInfo = [
    { title: "Frame Rate", val: "30" },
    { title: "Confidence Level", val: "0.60" },
];

const RenderSection = ({ title, data, fullWidth = false }) => (
    data.length > 0 && (
        <Stack 
            sx={{ 
                flex: fullWidth ? "1 1 100%" : "1 1 45%", 
            }}
        >
            <Holder title={title}>
              
                    <Stack 
                        gap={2} 
                        direction={fullWidth ? "row" : "column"} 
                        justifyContent={fullWidth ? "space-between" : "flex-start"}
                        sx={{ flex: 1 }} // Ensures inner content stretches
                    >
                        {data.map((item, index) => (
                            <HighlightedText key={item.id || index} title={item.title} val={item.val} />
                        ))}
                    </Stack>
              
            </Holder>
        </Stack>
    )
);

const Dashbourd = () => {
    const [streamData , setStreamData] = useState([])
    const [paramStreamData , setParamStreamData] = useState({})
    const api = useAxiosWithAuth();

    function convertToObjArray(inputObj) {
        return Object.keys(inputObj)
          .filter(key => key !== "user_id") 
          .map(key => ({
            title: key.replace(/_/g, ' '), 
            val: inputObj[key]
          }));
      }
      

    const getAllStreams = () => {
        api.get("source")
        .then(response => {
            const res = response.data?.map(el => ({ title: el.name, val: ( el.status === "inactive" ? "Off" :"On")  }));
            setStreamData(res);
            // setLoading(false);
        })
            .catch(error => {
                console.log(error)
                // setError(error);
                // setLoading(false);
            });
    };

    const paramStream = () => {
        api.get("param_stream/users")
        .then(response => {
            console.log("test",response.data);
             const res = convertToObjArray(response.data[0]);
             setParamStreamData(res);
            // setLoading(false);
        })
            .catch(error => {
                console.log(error)
                // setError(error);
                // setLoading(false);
            });
    };

useEffect(()=>{
getAllStreams()
paramStream()
},[])
    return (
        <Stack 
            direction="row" 
            flexWrap="wrap" 
            gap={4} 
            justifyContent="space-between"
            alignItems="stretch"
        >
            <RenderSection title="Personal Info" data={paramStreamData} />
            <RenderSection title="Camera Status" data={streamData} />
            <RenderSection title="System Information" data={paramStreamData} fullWidth />
        </Stack>
    );
};

export default Dashbourd;
