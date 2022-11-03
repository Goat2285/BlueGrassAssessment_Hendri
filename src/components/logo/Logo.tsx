import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  cursorPointer?: Boolean,  
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, cursorPointer, ...other }, ref) => {

    const logo = (
      <Box
        component="img"
        src="/assets/images/logo.svg"
        sx={{ width: 124, height: 50, cursor: cursorPointer ? 'pointer' : 'default', ...sx }}
      />
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
