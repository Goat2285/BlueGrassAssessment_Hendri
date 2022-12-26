import { Theme, alpha } from '@mui/material/styles';
import { SwitchProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function Switch(theme: Theme) {
  const isLight = theme.palette.mode === 'light';

  const rootStyle = (ownerState: SwitchProps) => ({
    padding: '9px 13px 9px 12px',
    width: 58,
    height: 38,
    ...(ownerState.size === 'small' && {
      padding: '4px 8px 4px 7px',
      width: 40,
      height: 24,
    }),
    '& .MuiSwitch-thumb': {
      width: 14,
      height: 14,
      boxShadow: 'none',
      transform: 'scale(1.4)',
      color: `${theme.palette.grey[100]} !important`,
      ...(ownerState.size === 'small' && {
        width: 10,
        height: 10,
      }),
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      borderRadius: 14,
      backgroundColor: alpha(theme.palette.grey[500], 0.48),
      width: '36px',
      height: '14px',
    },
    '& .MuiSwitch-switchBase': {
      left: 2,
      padding: 12,
      top: -3,
      ...(ownerState.size === 'small' && {
        padding: 7,
      }),
      '&.Mui-checked': {
        transform: 'translateX(13px)',
        '&+.MuiSwitch-track': { opacity: 1 },
        ...(ownerState.size === 'small' && {
          transform: 'translateX(9px)',
        }),
        '& .MuiSwitch-thumb': {
          color: `${theme.palette.primary.main} !important`,
        },
      },
      '&.Mui-disabled': {
        '& .MuiSwitch-thumb': { opacity: isLight ? 1 : 0.48 },
        '&+.MuiSwitch-track': { opacity: 0.48 },
      },
    },
  });

  return {
    MuiSwitch: {
      styleOverrides: {
        root: ({ ownerState }: { ownerState: SwitchProps }) => rootStyle(ownerState),
      },
    },
  };
}
