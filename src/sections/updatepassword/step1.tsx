import { Typography, Button, Box } from "@mui/material";
import Updatepasswordform, { UpdatepasswordformProps } from './updatepasswordform';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassWordStep1({ handleSubmit, onSubmit, methods, errors, isSubmitting, isSubmitSuccessful }: UpdatepasswordformProps){
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h3">Update Password</Typography>
      <Box sx={{ m: 1 }}/>
      <Typography variant="body1" color='text.tertiary' sx={{ textAlign: 'center' }}>Please enter your new password below and then click the update button.</Typography>
      <Box sx={{ mb: 5 }}/>      
      <Updatepasswordform 
        handleSubmit={handleSubmit} 
        onSubmit={onSubmit} 
        methods={methods} 
        errors={errors} 
        isSubmitting={isSubmitting} 
        isSubmitSuccessful={isSubmitSuccessful} 
      />
      <Button 
        variant="text" 
        size="large" 
        sx={{ width: '100%' }}
        onClick={()=>{
          navigate('/login');
        }}
      >
        Back      
      </Button>
    </>
  )
}