import { Stack, Button } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import ConfirmDialog from 'src/components/confirm-dialog';
import DashboardWelcome from 'src/components/dashboard-welcome';
import PractisesTable from 'src/components/practises-table';
import { useGetPractices } from 'src/hooks/api/practices/useGetPractices';
import PracticeAddForm from './PracticeAddForm';

const TABLE_HEAD = [
  { id: 'practiseName', label: 'Practise Name', align: 'left' },
  { id: 'phone', label: 'Tel No', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'date', label: 'Date Created', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function ManagePractises() {
  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = useQueryClient();

  const { data: practices } = useGetPractices();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const refetch = () => {
    console.log('refetch');

    queryClient.refetchQueries(['getPractices']);
    console.log(practices);
  };

  return (
    <Stack>
      <DashboardWelcome
        title="Manage Practises"
        subtitle="Add a new practise or manage existing ones"
        action={
          <Button
            variant="contained"
            size="medium"
            sx={{ lineHeight: 22 / 14, fontWeight: 'fontWeightMedium' }}
            onClick={handleOpenDialog}
          >
            Add Practise
          </Button>
        }
        sx={{ mt: 4 }}
      />

      <PractisesTable
        tableRows={practices}
        searchable={true}
        hasPagination={true}
        hasMore={false}
        tableHeads={TABLE_HEAD}
        refetch={refetch}
      />

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Add Practice"
        content={<PracticeAddForm closeDialog={handleCloseDialog} refetch={refetch} />}
      />
    </Stack>
  );
}
