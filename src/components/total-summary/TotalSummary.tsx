import { alpha, Box, Card, CardProps, Stack, Typography } from '@mui/material';
import React from 'react';
import BabyCarriageIllustration from 'src/assets/illustrations/BabyCarriageIllustration';
import BulbIllustration from 'src/assets/illustrations/BulbIllustration';
import ConsentsIllustration from 'src/assets/illustrations/ConsentsIllustration';
import StethoscopeIllustration from 'src/assets/illustrations/StethoscopeIllustration';
import TreatmentsIllustration from 'src/assets/illustrations/TreatmentsIllustration';
import Iconify from 'src/components/iconify';
import { fNumber, fPercent } from 'src/utils/formatNumber';

interface Props extends CardProps {
  title: string;
  total: number;
  percent: number;
  icon: string;
}

const IconComponents: { [name: string]: React.ReactNode } = {
  Stethoscope: <StethoscopeIllustration />,
  Consents: <ConsentsIllustration />,
  Treatments: <TreatmentsIllustration />,
  BabyCarriage: <BabyCarriageIllustration />,
  Bulb: <BulbIllustration />,
};

export default function TotalSummary({ title, percent, total, icon, sx, ...other }: Props) {
  const Icon = IconComponents[icon];

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3, ...sx }} {...other}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">{title}</Typography>

        <TrendingInfo percent={percent} />

        <Typography variant="h3">{fNumber(total)}</Typography>
      </Box>
      <Box
        sx={{
          width: 64,
          height: 64,
          lineHeight: 0,
          borderRadius: '50%',
          bgcolor: 'background.neutral',
        }}
      >
        {Icon}
      </Box>
    </Card>
  );
}

type TrendingInfoProps = {
  percent: number;
};

function TrendingInfo({ percent }: TrendingInfoProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 1, mb: 0.5 }}>
      <Iconify
        icon={percent < 0 ? 'eva:trending-down-fill' : 'eva:trending-up-fill'}
        sx={{
          mr: 1,
          p: 0.5,
          width: 24,
          height: 24,
          borderRadius: '50%',
          color: 'success.main',
          bgcolor: (theme) => alpha(theme.palette.success.main, 0.16),
          ...(percent < 0 && {
            color: 'error.main',
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
          }),
        }}
      />

      <Typography component="div" variant="subtitle2">
        {percent > 0 && '+'}

        {fPercent(percent)}
      </Typography>
    </Stack>
  );
}
