import { Grid, Stack } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useAuthContext } from 'src/auth/useAuthContext';
import DashboardWelcome from 'src/components/dashboard-welcome';
import PractisesTable from 'src/components/practises-table';
import TotalSummary from 'src/components/total-summary';
import { useGetLatestPractices } from 'src/hooks/api/practices/useGetLatestPractices';

const TABLE_HEAD = [
  { id: 'practiseName', label: 'Practise Name', align: 'left' },
  { id: 'phone', label: 'Tel No', align: 'left' },
  { id: 'email', label: 'Email', align: 'left' },
  { id: 'date', label: 'Date Created', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function SuperAdminDashboard() {
  const { user } = useAuthContext();

  const welcome = `Welcome ${user?.user.firstname} ${user?.user.lastname}!`;

  const queryClient = useQueryClient();

  const { data: latestPractices } = useGetLatestPractices({ count: 3 });

  const totalSummary = [
    {
      id: '1',
      title: 'Total Patients',
      percent: 15,
      total: 11,
      icon: 'Stethoscope',
    },
    {
      id: '2',
      title: 'Total Subscribers',
      percent: 15,
      total: 261,
      icon: 'BabyCarriage',
    },
    {
      id: '3',
      title: 'Total Treatments',
      percent: 15,
      total: 135,
      icon: 'Treatments',
    },
    {
      id: '4',
      title: 'Total Consents',
      percent: 15,
      total: 135,
      icon: 'Consents',
    },
    {
      id: '5',
      title: 'Total Consents signed',
      percent: 15,
      total: 2159,
      icon: 'Consents',
    },
    {
      id: '6',
      title: 'Total Fact sheets read',
      percent: 15,
      total: 1259,
      icon: 'Bulb',
    },
  ];

  const refetch = () => {
    queryClient.refetchQueries(['getLatestPractices']);
  };

  return (
    <Stack>
      <DashboardWelcome
        title={welcome}
        subtitle="Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eleifend laoreet."
        sx={{ mt: 4 }}
      />

      <Grid container spacing={3}>
        {totalSummary.map(({ id, title, percent, total, icon }) => (
          <Grid key={id} item xs={12} md={4}>
            <TotalSummary title={title} percent={percent} total={total} icon={icon} />
          </Grid>
        ))}
      </Grid>

      <PractisesTable
        title="Newest Practises"
        tableRows={latestPractices}
        searchable={false}
        hasPagination={false}
        hasMore={true}
        tableHeads={TABLE_HEAD}
        refetch={refetch}
        sx={{ mt: 5 }}
      />
    </Stack>
  );
}
