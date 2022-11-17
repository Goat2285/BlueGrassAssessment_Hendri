import { Grid, Stack, Typography } from '@mui/material';
import ConsentsIllustration from 'src/assets/illustrations/ConsentsIllustration';
import StethoscopeIllustration from 'src/assets/illustrations/StethoscopeIllustration';
import TreatmentsIllustration from 'src/assets/illustrations/TreatmentsIllustration';
import { useAuthContext } from 'src/auth/useAuthContext';
import TotalSummary from 'src/components/total-summary';
import LandingRecentUpdates from './LandindRecentUpdates';
import LandingChartWidgets from './LandingChartWidgets';
import TableData from './TableData';

export default function Landing() {
  const { user } = useAuthContext();

  return (
    <Stack sx={{ mt: 3, position: 'relative' }}>
      <Typography variant="h5">Welcome {user?.displayName}!</Typography>
      <Stack
        direction="row"
        sx={{
          mt: 1,
        }}
      >
        <Typography variant="body2">
          Nulla ut aliquam metus. Integer at diam sem. Nunc finibus nibh vel risus eleifend laoreet.
        </Typography>
      </Stack>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={4}>
          <TotalSummary
            title="Total Patients"
            percent={15}
            total={11}
            icon={<StethoscopeIllustration />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalSummary
            title="Total Consents Signed"
            percent={15}
            total={261}
            icon={<ConsentsIllustration />}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TotalSummary
            title="Total Treatments Performed"
            percent={15}
            total={135}
            icon={<TreatmentsIllustration />}
          />
        </Grid>
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
