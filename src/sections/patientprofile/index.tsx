import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useAuthContext } from 'src/auth/useAuthContext';
import DashboardWelcome from 'src/components/dashboard-welcome';
import Iconify from 'src/components/iconify';
import LoadingScreen from 'src/components/loading-screen';
import { useGetPatientProfile } from 'src/hooks/api/patients/useGetPatientProfile';
import { GREYS } from 'src/theme/palette';
import ClinicInfo from './ClinicInfo';
import PartnerInfo from './PartnerInfo';
import PersonalInfo from './PersonalInfo';
import Security from './Security';

export default function PatientProfile() {
  const [currentTab, setCurrentTab] = useState('partner-1');

  const { initialize } = useAuthContext();

  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useGetPatientProfile();

  const refetch = () => {
    queryClient.refetchQueries(['getPatientProfile']);
    initialize();
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
      component: (
        <PartnerInfo
          firstName={profile?.partner.firstName}
          lastName={profile?.partner.lastName}
          email={profile?.partner.email}
          contactNumber={profile?.partner.contactNumber}
          nationality={profile?.partner.nationality}
          idOrPassport={profile?.partner.idOrPassport}
          address={profile?.partner.address}
          dateOfBirth={profile?.partner.dateOfBirth}
          refetch={refetch}
        />
      ),
    },
    {
      value: 'clinic',
      label: 'Clinic',
      icon: <Iconify icon="icon-park-outline:hospital-two" />,
      component: <ClinicInfo clinic={'Cape Fertility Clinic'} />,
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
