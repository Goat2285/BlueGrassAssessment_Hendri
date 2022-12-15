import { Box, Stack } from '@mui/material';
import Check from '@mui/icons-material/Check';
import { StepperProps } from '../../sections/register/types';
// Styles
import { StyledDot, StyledStepper, StyledStepLine, StyledStepperLabel } from './styles';

export const LABELWIDTH = 240;
export const SIDEPADDING = 100;

export default function Stepper({ currentStep, steps }: StepperProps) {
  return (
    <StyledStepper sx={{ maxWidth: steps.length * LABELWIDTH + SIDEPADDING * 2 }}>
      {steps.map((entry, index) => (
        <Box key={entry.key} sx={{ flex: index !== 0 ? 1 : 0, position: 'relative' }}>
          <Stack
            direction="row"
            alignItems="center"
            sx={{ margin: '0 !important', flex: index !== 0 ? 1 : 0 }}
          >
            {index !== 0 ? (
              <StyledStepLine
                sx={{ backgroundColor: currentStep >= entry.step ? 'primary.main' : 'grey.300' }}
              />
            ) : null}
            {currentStep <= entry.step ? (
              <StyledDot
                sx={{ backgroundColor: currentStep >= entry.step ? 'primary.main' : 'grey.300' }}
              />
            ) : null}
            {currentStep > entry.step ? <Check color="primary" sx={{ margin: '8px' }} /> : null}
          </Stack>
          {entry.tickLabel ? <StyledStepperLabel>{entry.tickLabel}</StyledStepperLabel> : null}
        </Box>
      ))}
    </StyledStepper>
  );
}
