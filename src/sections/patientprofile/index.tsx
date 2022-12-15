import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import DashboardWelcome from 'src/components/dashboard-welcome';
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';
import { useGetPatientProfile } from 'src/hooks/api/patients/useGetPatientProfile';
import { GREYS } from 'src/theme/palette';
import PartnerInfo from './PartnerInfo';
import PersonalInfo from './PersonalInfo';
import Security from './Security';

export default function PatientProfile() {
  const [currentTab, setCurrentTab] = useState('partner-1');

  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useGetPatientProfile();

  const refetch = () => {
    queryClient.refetchQueries(['getPatientProfile']);
  };

  const TABS = [
    {
      value: 'partner-1',
      label: 'Partner 1',
      icon: <Iconify icon="uil:user" />,
      component: (
        <PersonalInfo
          firstName={profile?.firstName}
          lastName={profile?.lastName}
          email={profile?.email}
          contactNumber={profile?.contactNumber}
          nationality={profile?.nationality}
          idOrPassport={profile?.idOrPassport}
          address={profile?.address}
          dateOfBirth={profile?.dateOfBirth}
          refetch={refetch}
        />
      ),
    },
    {
      value: 'partner-2',
      label: 'Partner 2',
      icon: <Iconify icon="uil:users-alt" />,
      component: <PartnerInfo />,
    },
    {
      value: 'security',
      label: 'Security',
      icon: <Iconify icon="uil:shield-check" />,
      component: <Security />,
    },
  ];

  if (isLoading) return <LoadingScreen />;

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
