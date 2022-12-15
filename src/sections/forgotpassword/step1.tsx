import { Typography, Button, Box } from "@mui/material";
import Forgotpasswordform, { ForgotpasswordFormProps } from './forgotpasswordform';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassWordStep1({ handleSubmit, onSubmit, methods, errors, isSubmitting }: ForgotpasswordFormProps){
  const navigate = useNavigate();
  return (
    <>
      <Typography variant="h3">Forgot Password</Typography>
      <Box sx={{ m: 1 }}/>
      <Typography variant="body1" color='text.tertiary' sx={{ textAlign: 'center' }}>Please enter your email address below to reset your password. We will send you an email containing a link, which will allow you to change your password.</Typography>
      <Box sx={{ mb: 5 }}/>      
      <Forgotpasswordform 
        handleSubmit={handleSubmit} 
        onSubmit={onSubmit} 
        methods={methods} 
        errors={errors} 
        isSubmitting={isSubmitting}
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