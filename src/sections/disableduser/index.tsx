import { Typography, Button, Stack, Box } from "@mui/material";
import Image from '../../components/image';
import { useNavigate } from 'react-router-dom';

export default function AccountDisabled() {
  const navigate = useNavigate();

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      maxWidth: 480 
    }}>
      <Image
        disabledEffect
        visibleByDefault
        alt="Man's head silhouette"
        src={'/assets/images/illustrations/ic_disabled.svg'}
        sx={{ width: 195 }}
        objectFit={'contain'}
      />
      <Box sx={{ m: 2 }}/>
      <Typography variant="h3">Account Disabled</Typography>
      <Box sx={{ m: 1 }}/>
      <Typography variant="body1" color='text.secondary' sx={{ textAlign: 'center' }}>Your account access has been disabled. Please get in touch with us to discuss how to go about reactivating your account</Typography>
      <Box sx={{ mb: 5 }}/>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ width: '100%' }}
        onClick={()=>{
          navigate('/login');
        }}
      >
        Done      
      </Button>
    </Stack>
  );
}