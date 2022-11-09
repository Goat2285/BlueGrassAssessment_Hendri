import { styled } from '@mui/material/styles';
import { SIDEPADDING, LABELWIDTH } from './stepper';

export const StyledDot = styled('div')(({ theme }) => ({
  width: '8px',
  height: '8px',
  margin: 16,
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));

export const StyledStepLine = styled('div')(() => ({
  height: '2px',
  flex: 1,
}));

export const StyledStepper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  paddingBottom: '38px',
  paddingLeft: SIDEPADDING,
  paddingRight: SIDEPADDING,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

export const StyledStepperLabel = styled('p')(({ theme }) => ({
  position: 'absolute', 
  right: '15px', 
  transform: 'translateX(50%)',
  marginBottom: 0,
  marginTop: '8px',
  fontSize: "14px",
  lineHeight: "22px",
  letterSpacing: 0,
  textAlign: 'center',
  width: LABELWIDTH,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
}));
