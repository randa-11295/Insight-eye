import { Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';
const ReusableToggleBtns = ({ options, value, handleToggleChange }) => {
     return (
          <ToggleButtonGroup color="primary" value={value} exclusive onChange={handleToggleChange}>
               {options.map(({ value, icon: Icon }) => (
                    <Tooltip key={value} title={value} placement="top" arrow  >
                         <ToggleButton value={value}>
                              <Icon />
                         </ToggleButton>
                    </Tooltip>
               ))}
          </ToggleButtonGroup>
     );
};


export default ReusableToggleBtns