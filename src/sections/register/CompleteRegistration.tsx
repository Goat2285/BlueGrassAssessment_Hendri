import { Stack, Typography, Button } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import Image from 'src/components/image';

type Props = {
  onClose: () => void;
};

export default function CompleteRegistration({ onClose }: Props) {
  const navigate = useNavigate();

  const getURLValues = () => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('t')?.replace(/ /g, '+');
    const member = params.get('m')?.replace(/ /g, '+');

    if (!token || !member) {
      return {
        userId: 'Unknown',
        token: 'Unknown',
      };
    }

    return {
      userId: member,
      token: token,
    };
  };

  const userDetails = useMemo(() => getURLValues(), []);

  const handleComplete = () => {
    onClose();
    navigate(`/auth/createpassword/?t=${userDetails.token}&m=${userDetails.userId}`);
  };
  return (
    <Stack direction="column" alignItems="center" sx={{ px: 3 }}>
      <Image
        disabledEffect
        visibleByDefault
        alt="My fertility journey - Happy family with a child"
        src={'/assets/images/illustrations/illustration_empty_content.svg'}
        sx={{ width: 128 }}
        objectFit={'contain'}
      />
      <Typography variant="h4" sx={{ mt: '20px', mb: 2 }}>
        Application Complete!
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Thank you for taking this journey with us. We understand the sensitive and confidential
        nature of this journey and undertake to be with you every step of the way, to help you
        navigate both the legal and practical issues involved in your journey.
      </Typography>
      <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
        You will be redirected to a screen where you can set your password
      </Typography>
      <Button variant="contained" fullWidth size={'large'} sx={{ mt: 5 }} onClick={handleComplete}>
        Set up Password
      </Button>
    </Stack>
  );
}
