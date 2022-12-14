import { Typography, Stack } from '@mui/material';
import Check from '@mui/icons-material/Check';

type Props = {
  title: string;
};

export default function IncludedInPrice({ title }: Props) {
  return (
    <Stack direction="row">
      <Check color="primary" />
      <Typography variant="body1" sx={{ ml: '12px' }}>
        {title}
      </Typography>
    </Stack>
  );
}
