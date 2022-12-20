import { Stack, Typography, Button } from '@mui/material';

type Props = {
  closeDialog: () => void;
};

export default function TransferPatient({ closeDialog }: Props) {
  return (
    <Stack>
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'grey.600', mb: 2 }}>
        You are about to transfer your profile to{' '}
        <strong style={{ fontWeight: 600 }}>Cope Fetility</strong>
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'grey.600' }}>
        Are you sure you want to proceed?
      </Typography>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={2} sx={{ mt: 4 }}>
        <Button variant="outlined" size={'large'} sx={{ flex: 1 }} onClick={closeDialog}>
          Cancel
        </Button>
        <Button variant="contained" size={'large'} sx={{ flex: 1, mt: { xs: 2 } }}>
          Transfer
        </Button>
      </Stack>
    </Stack>
  );
}
