import { Box, BoxProps, Stack, Typography } from '@mui/material';

interface Props extends BoxProps {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}

export default function DashboardWelcome({ title, subtitle, action, sx, ...other }: Props) {
  return (
    <Box sx={{ mb: 5, ...sx }} {...other}>
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'left', sm: 'center' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2">{subtitle}</Typography>
        </Box>
        {action ? <Box sx={{ flexShrink: 0, mt: { xs: 2, sm: 0 } }}>{action}</Box> : null}
      </Stack>
    </Box>
  );
}
