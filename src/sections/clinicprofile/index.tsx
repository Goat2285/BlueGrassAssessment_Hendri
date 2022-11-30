import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import DashboardWelcome from 'src/components/dashboard-welcome';
import Iconify from 'src/components/iconify';
import { GREYS } from 'src/theme/palette';
import MyDetails from './MyDetails';
import Security from './Security';

export default function ClinicProfile() {
  const [currentTab, setCurrentTab] = useState('my-details');

  const TABS = [
    {
      value: 'my-details',
      label: 'My Details',
      icon: <Iconify icon="uil:user" />,
      component: <MyDetails />,
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Iconify icon="uil:shield-check" />,
      component: <Security />,
    },
  ];

  return (
    <Stack>
      <DashboardWelcome
        title="Profile"
        subtitle="Manage your account information here"
        sx={{ mt: 4 }}
      />

      <Stack>
        <Tabs
          value={currentTab}
          onChange={(event, newValue) => setCurrentTab(newValue)}
          sx={{
            borderBottom: 1,
            borderBottomColor: 'action.disabledBackground',
            '& .MuiTabs-indicator': {
              borderRadius: 2,
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              icon={tab.icon}
              value={tab.value}
              sx={{
                color: 'primary',
                '&.Mui-selected > svg': {
                  color: 'primary.darker',
                },
                '&:not(.Mui-selected)': {
                  color: `${GREYS.grey3}`,
                },
              }}
            />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 4 }}>
                {tab.component}
              </Box>
            )
        )}
      </Stack>
    </Stack>
  );
}
