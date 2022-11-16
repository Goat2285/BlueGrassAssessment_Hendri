// @mui
import { Typography, Stack, Link } from '@mui/material';
// components
import Logo from '../../components/logo';
import Image from '../../components/image';
//
import { StyledRoot, StyledSectionBg, StyledSection, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <Logo
        disabledLink={true}
        logoStyle={2}
        sx={{
          zIndex: 9,
          position: 'absolute',
          mt: { xs: 1.5, md: 5 },
          ml: { xs: 2, md: 5 },
        }}
      />
         <StyledSection sx={{ minWidth: 440, maxWidth: 444, borderRadius: '16px', boxShadow: 20, m: '16px' }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="My fertility journey - Happy family with a child"
          src={illustration || '/assets/images/logo-style3.svg'}
          sx={{ width: 364 }}
          objectFit={'contain'}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
