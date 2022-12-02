import { Grid, Stack, Typography } from '@mui/material';
import ConsentsIllustration from 'src/assets/illustrations/ConsentsIllustration';
import StethoscopeIllustration from 'src/assets/illustrations/StethoscopeIllustration';
import TreatmentsIllustration from 'src/assets/illustrations/TreatmentsIllustration';
import { useAuthContext } from 'src/auth/useAuthContext';
import DashboardWelcome from 'src/components/dashboard-welcome';
import TotalSummary from 'src/components/total-summary';
import LandingRecentUpdates from './LandindRecentUpdates';
import LandingChartWidgets from './LandingChartWidgets';
import TableData from './TableData';

export default function Landing() {
  const { user } = useAuthContext();

  const welcome = `Welcome ${user?.displayName || 'Andrew'}!`;

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
      title: 'Total Consents',
      percent: 15,
      total: 261,
      icon: 'Consents',
    },
    {
      id: '3',
      title: 'Total Treatments',
      percent: 15,
      total: 135,
      icon: 'Treatments',
    },
  ];

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
      <Grid
        spacing={3}
        container
        sx={{
          mt: 3,
        }}
      >
        <Grid item md={8} xs={12}>
          <LandingRecentUpdates title="Recent Updates" tableData={TableData} />
        </Grid>
        <Grid item md={4} xs={12}>
          <LandingChartWidgets
            chart={{
              series: [
                { label: 'Registered', percent: 56 },
                { label: 'Pending', percent: 24 },
                { label: 'Post Treatment', percent: 65 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
