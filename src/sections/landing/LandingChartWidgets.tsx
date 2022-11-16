import { Box, Card, CardProps, Divider, Typography, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ApexOptions } from 'apexcharts';
import Chart, { useChart } from 'src/components/chart';
import { CHART } from 'src/theme/palette';
import { fPercent } from 'src/utils/formatNumber';

const CHART_SIZE = { width: 106, height: 106 };

interface Props extends CardProps {
  chart: {
    series: {
      label: string;
      percent: number;
    }[];
    options?: ApexOptions;
  };
}

export default function LandingChartWidgets({ chart, ...other }: Props) {
  const theme = useTheme();

  const { series, options } = chart;

  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize as string,
          },
        },
      },
    },
    colors: [CHART.green],
    ...options,
  });

  const chartOptionsMedium = {
    ...chartOptions,
    colors: [CHART.orange],
  };

  const chartOptionsLow = {
    ...chartOptions,
    colors: [CHART.red],
  };

  return (
    <Card {...other}>
      <Stack divider={<Divider orientation="horizontal" flexItem />}>
        {series.map((item, index) => (
          <Stack
            key={item.label}
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{ width: 1, px: '57px', py: '30px' }}
          >
            <Chart
              type="radialBar"
              series={[item.percent]}
              options={
                item.percent > 64
                  ? chartOptions
                  : item.percent > 40
                  ? chartOptionsMedium
                  : chartOptionsLow
              }
              {...CHART_SIZE}
            />

            <Box sx={{ ml: 4 }}>
              <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fPercent(item.percent)}
              </Typography>

              <Typography variant="body2" sx={{ opacity: 0.72, color: 'text.secondary' }}>
                {item.label}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
