import { Theme } from '@mui/material/styles';
import { GREYS } from '../palette';

// ----------------------------------------------------------------------

export default function Table(theme: Theme) {
  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
          '& .MuiTableCell-head': {
            padding: '17px 8px 17px 16px',
          },
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          padding: '5px 8px 5px 20px',
          color: GREYS.grey1,
        },
        head: {
          color: theme.palette.grey[600],
          backgroundColor: theme.palette.grey[100],
          '&:first-of-type': {
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
          },
          '&:last-of-type': {
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small',
        },
        nextIconButtonProps: {
          size: 'small',
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
