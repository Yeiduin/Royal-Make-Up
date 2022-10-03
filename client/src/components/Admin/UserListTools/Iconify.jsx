import { Icon } from '@iconify/react';
import { Box } from '@mui/material';


export const Iconify = ({ icon, sx, ...other }) => {
  return <Box component={Icon} icon={icon} sx={{ ...sx }} {...other} />;
}