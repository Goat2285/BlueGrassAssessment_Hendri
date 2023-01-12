import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { useSnackbar } from '../../../components/snackbar';
import MenuPopover from '../../../components/menu-popover';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();

  const { user, logout } = useAuthContext();

  const OPTIONS = [
    {
      label: 'Profile',
      linkTo:
        user?.user?.roles[0] === 'SuperAdmin'
          ? '/superadmin/dashboard/profile'
          : user?.user.roles[0] === 'Patient'
          ? '/patient/dashboard/profile'
          : '/dashboard/profile',
    },
  ];

  const { enqueueSnackbar } = useSnackbar();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleLogout = async () => {
    try {
      logout();
      navigate(PATH_AUTH.login, { replace: true });
      handleClosePopover();
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    handleClosePopover();
    navigate(path);
  };

  return (
    <>
      <Typography
        variant="subtitle2"
        noWrap
        onClick={handleOpenPopover}
        sx={{
          color: (theme) => alpha(theme.palette.grey[800], 1),
          cursor: 'pointer',
          '&::after': {
            content: 'url(/assets/images/icons/ic_arrow-down.svg)',
            pl: 1.9,
            position: 'relative',
            bottom: '2px',
          },
        }}
      >
        {`${user?.user.firstname} ${user?.user.lastname}`}
      </Typography>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        sx={{ minWidth: 200, p: 0, mt: 4.3 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {`${user?.user.firstname} ${user?.user.lastname}`}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: (theme) => alpha(theme.palette.grey[600], 1) }}
            noWrap
          >
            {user?.user.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'solid' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'solid' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </MenuPopover>
    </>
  );
}
