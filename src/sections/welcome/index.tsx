import { Typography, Button, Link, Stack, Box } from "@mui/material";
import Image from '../../components/image';
import { useNavigate } from 'react-router-dom';
// Styles
import { StylesGettingStarted } from './styles';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      paddingLeft: '20px',
      paddingRight: '20px'
    }}>
      <StylesGettingStarted>
        <Typography variant="body2">Already have an account? &nbsp;
          <Link variant="body2" color="inherit" underline='hover' sx={{ cursor: "pointer", color: 'primary.dark', fontWeight: 'bold' }} href="/login"> Sign In</Link>
        </Typography>
      </StylesGettingStarted>
      <Typography variant="h3" >Welcome to</Typography>
      <Box m={3} />
      <Image
        disabledEffect
        visibleByDefault
        alt="Man's head silhouette"
        src={'/assets/images/illustrations/illustration_empty_content.svg'}
        sx={{ width: '100%', maxWidth: 480 }}
        objectFit={'contain'}
      />
      <Box m={4} />
      <Button
        variant="contained"
        size="large"
        onClick={()=>{
          navigate('/auth/register');
        }}
      >
        Get Started
      </Button>
    </Stack>
  );
}

