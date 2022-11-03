// @mui
import { Typography, Stack } from '@mui/material';
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
    <StyledRoot sx={{ p:'16px' }}>
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

      <StyledSection sx={{ maxWidth: 444, borderRadius: '16px', boxShadow: 20 }}>
        <Typography variant="h3" sx={{ textAlign: 'center', mb: 5 }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        <Image
          disabledEffect
          visibleByDefault
          alt="My fertility journey - Happy family with a child"
          src={illustration || '/assets/images/illustrations/dashboard.svg'}
          sx={{ maxWidth: 720 }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}> {children} </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
