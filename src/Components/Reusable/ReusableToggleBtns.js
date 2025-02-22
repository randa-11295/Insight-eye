import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TocIcon from '@mui/icons-material/Toc';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
export default function ReusableToggleBtns() {
     const [alignment, setAlignment] = React.useState('web');

     const handleChange = (event, newAlignment) => {
          setAlignment(newAlignment);
     };

     return (
          <ToggleButtonGroup
               color="primary"
               value={alignment}
               exclusive
               onChange={handleChange}

          >
               <ToggleButton value="toggle"><DashboardOutlinedIcon /></ToggleButton>
               <ToggleButton value="table"><TocIcon /></ToggleButton>
               <ToggleButton value="chart"><ShowChartIcon /></ToggleButton>
          </ToggleButtonGroup>
     );
}
