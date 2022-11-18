import { Stack, Button } from '@mui/material';
import DashboardWelcome from 'src/components/dashboard-welcome';
import PractisesTable from 'src/components/practises-table';
import TableData from './TableData';

const TABLE_HEAD = [
  { id: 'practiseName', label: 'Practise Name', align: 'left' },
  { id: 'phone', label: 'Tel No', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'date', label: 'Date Created', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function ManagePractises() {
  const addPractise = () => {
    console.log('Add practise');
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
            onClick={addPractise}
          >
            Add Practises
          </Button>
        }
        sx={{ mt: 4 }}
      />

      <PractisesTable
        tableRows={TableData}
        searchable={true}
        hasPagination={true}
        hasMore={false}
        tableHeads={TABLE_HEAD}
      />
    </Stack>
  );
}
