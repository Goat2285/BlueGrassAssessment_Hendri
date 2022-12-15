// @mui
import { styled } from '@mui/material/styles';

export const StylesGettingStarted = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 78,
  [theme.breakpoints.up('sm')]: {    
    right: 40,
    top: 40,
  }, 
}));