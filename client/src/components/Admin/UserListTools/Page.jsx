import { forwardRef } from 'react';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
      <title>{`${title} | Minimal-UI`}</title>
      {meta}
    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));
