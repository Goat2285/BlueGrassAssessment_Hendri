// @mui
import { styled, alpha } from '@mui/material/styles';
// utils
import { bgGradient } from '../../utils/cssStyles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  [theme.breakpoints.up('lg')]: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 608,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    padding: theme.spacing(10, 8, 10, 8),
  },
}));

export const StylesGettingStarted = styled('div')(({ theme }) => ({
  position: 'absolute',
  right: 40,
  top: 40,
}));
