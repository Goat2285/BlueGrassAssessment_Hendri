// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// auth
import { useAuthContext } from '../../../auth/useAuthContext';
// components
import { CustomAvatar } from '../../../components/custom-avatar';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3.25, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

export default function NavAccount() {
    const { user } = useAuthContext();

    return (
        <StyledRoot>
            <CustomAvatar src={"/assets/images/icons/ic_portal.svg"}
                alt={user?.displayName}
                name={user?.displayName}
                sx={{
                    height: '20px',
                    width: 'auto',
                    background: 'initial',
                    borderRadius: 'unset'
                }} />

            <Box sx={{ ml: 2.25, minWidth: 0 }}>
                <Typography variant="subtitle1" noWrap>
                    {user?.displayName}
                    {/* Remove this when we have authentication */}
                    Cape Fertility Clinic
                </Typography>
            </Box>
        </StyledRoot>
    );
}
