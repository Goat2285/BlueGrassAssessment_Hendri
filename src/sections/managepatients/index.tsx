import InviteNewPatient from './InviteNewPatient';
import { Stack } from '@mui/material';
import { useGetDoctors } from 'src/hooks/api/doctors/useGetDoctors';
import LoadingScreen from 'src/components/loading-screen';

export default function ManagePatients() {
  const { data: doctors, isLoading } = useGetDoctors();

  if (isLoading) return <LoadingScreen />;

  return (
    <Stack>
      <InviteNewPatient closeDialog={() => {}} doctors={doctors} />
    </Stack>
  );
}
