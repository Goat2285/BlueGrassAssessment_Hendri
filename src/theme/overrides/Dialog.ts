import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function Dialog(theme: Theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiBackdrop-root': {
            background: 'linear-gradient(256.42deg, #161C24 0%, rgba(22, 28, 36, 0.48) 91.29%)',
          },
        },
        paper: {
          boxShadow: theme.customShadows.dialog,
          '&.MuiPaper-rounded': {
            borderRadius: Number(theme.shape.borderRadius) * 2,
            padding: '40px 0 32px',
          },
          '&.MuiDialog-paperFullScreen': {
            borderRadius: 0,
          },
          '&.MuiDialog-paper .MuiDialogActions-root': {
            padding: theme.spacing(3),
          },
          '&.MuiDialog-paper > .MuiTypography-root': {
            fontSize: 24,
            lineHeight: 36 / 24,
            textAlign: 'center',
            padding: 0,
          },
          '@media (max-width: 600px)': {
            margin: theme.spacing(2),
          },
          '@media (max-width: 663.95px)': {
            '&.MuiDialog-paperWidthSm.MuiDialog-paperScrollBody': {
              maxWidth: '100%',
            },
          },
        },
        paperFullWidth: {
          width: '100%',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
          '&.MuiDialogTitle-root+.css-dfihuu-MuiDialogContent-root': {
            paddingTop: theme.spacing(3),
          },
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 3),
          paddingTop: `${theme.spacing(3)} !important`,
        },
        dividers: {
          borderTop: 0,
          borderBottomStyle: 'dashed',
          paddingBottom: theme.spacing(3),
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '& > :not(:first-of-type)': {
            marginLeft: theme.spacing(1.5),
          },
        },
      },
    },
  };
}
