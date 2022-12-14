import { Typography, Button, Box } from '@mui/material';
import Image from '../../components/image';
import { useNavigate } from 'react-router-dom';

export default function CreatePassWordStep2() {
  const navigate = useNavigate();
  return (
    <>
      <Image
        disabledEffect
        visibleByDefault
        alt="Man's head silhouette"
        src={'/assets/images/illustrations/ic_assurances.svg'}
        sx={{ width: 195 }}
        objectFit={'contain'}
      />
      <Box sx={{ m: 2 }} />
      <Typography variant="h3">Password Created</Typography>
      <Box sx={{ m: 1 }} />
      <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
        Your password has been successfully created. Please proceed to the login screen and sign in
        using your created password.
      </Typography>
      <Box sx={{ mb: 5 }} />
      <Button
        variant="contained"
        size="large"
        sx={{ width: '100%' }}
        onClick={() => {
          navigate('/login');
        }}
      >
        Continue
      </Button>
    </>
  );
}
