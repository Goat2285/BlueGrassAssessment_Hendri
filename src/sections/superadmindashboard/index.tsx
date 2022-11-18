import { Stack } from '@mui/material';
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

export default function SuperAdminDashboard() {
  return (
    <Stack>
      <PractisesTable
        title="Newest Practises"
        tableRows={TableData}
        searchable={false}
        hasPagination={false}
        hasMore={true}
        tableHeads={TABLE_HEAD}
        sx={{ mt: 4 }}
      />
    </Stack>
  );
}
