import { Typography, Button, Box } from "@mui/material";
import Image from '../../components/image';
import { useNavigate } from 'react-router-dom';
import { ForgotpasswordFormProps } from "./forgotpasswordform";
import { useSnackbar } from "src/components/snackbar";


export default function ForgotPassWordStep2({ onSubmit }: ForgotpasswordFormProps){
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  
  return (
    <>
      <Image
        disabledEffect
        visibleByDefault
        alt="Man's head silhouette"
        src={'/assets/images/illustrations/ic_email_sent.svg'}
        sx={{ width: 195 }}
        objectFit={'contain'}
      />
      <Box sx={{ m: 2 }}/>
      <Typography variant="h3">Request sent successfully!</Typography>
      <Box sx={{ m: 1 }}/>
      <Typography variant="body1" color='text.secondary' sx={ { textAlign: 'center' } }>A message has been sent to you by email with instructions on how to reset your password. </Typography>
      <Box sx={{ mb: 5 }}/>
      <Button 
        variant="contained" 
        size="large" 
        sx={{ width: '100%' }}
        onClick={()=>{
          navigate('/login');
        }}
      >
        Back to Login      
      </Button>
      <Box sx={{ m: 1 }}/>
      <Typography variant="body2">Didn’t receive an email? &nbsp;
        <Button 
          variant="text" 
          color="inherit"         
          sx={{ cursor: "pointer", color: 'primary.dark', fontWeight: 'bold' }}
          onClick={()=>{onSubmit(); enqueueSnackbar('Email sent!');}}
          >
            Resend Email
        </Button>
      </Typography>
    </>
  )
}