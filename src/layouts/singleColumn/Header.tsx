// @mui
import { Stack } from '@mui/material';

// components
import Logo from '../../components/logo';

// Styles
import { StyledHeader } from './styles';

export default function Header() {
  return (
    <StyledHeader>
      <Logo logoStyle={3} disabledLink={true} />
    </StyledHeader>
  );
}

