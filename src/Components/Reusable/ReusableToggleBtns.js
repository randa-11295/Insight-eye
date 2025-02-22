import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const ReusableToggleBtns = ({ options, value, onChange }) => {
     return (
          <ToggleButtonGroup color="primary" value={value} exclusive onChange={onChange}>
               {options.map(({ value, icon: Icon }) => (
                    <ToggleButton key={value} value={value}>
                         <Icon />
                    </ToggleButton>
               ))}
          </ToggleButtonGroup>
     );
};


export default ReusableToggleBtns