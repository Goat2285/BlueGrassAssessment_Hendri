import { Typography, Box } from '@mui/material';
import CreatePasswordForm, { CreatePasswordFormProps } from './CreatePasswordForm';

export default function CreatePassWordStep1({
  handleSubmit,
  onSubmit,
  methods,
  errors,
  isSubmitting,
}: CreatePasswordFormProps) {
  return (
    <>
      <Typography variant="h3">Create Login Password</Typography>
      <Box sx={{ m: 1 }} />
      <Typography variant="body1" color="text.tertiary" sx={{ textAlign: 'center' }}>
        Please enter your desired login password below and then click the create button.
      </Typography>
      <Box sx={{ mb: 5 }} />
      <CreatePasswordForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        methods={methods}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
