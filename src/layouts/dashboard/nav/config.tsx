// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/images/icons/${name}.svg`}
    sx={{ height: '18.33px', color: 'primary.main' }}
  />
);

const ICONS = {
  dashboard: icon('ic_dashboard'),
  profile: icon('ic_profile'),
  users: icon('ic_users'),
  patients: icon('ic_patients'),
  logs: icon('ic_logs'),
  practices: icon('ic_practices'),
  fertility: icon('ic_fertility'),
  consents: icon('ic_consents'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.app,
        icon: ICONS.dashboard,
        roles: ['Admin', 'Staff', 'Doctor'],
      },
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.superAdmin.app,
        icon: ICONS.dashboard,
        roles: ['SuperAdmin'],
      },
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.patient.app,
        icon: ICONS.dashboard,
        roles: ['Patient'],
      },
      {
        title: 'My Profile',
        path: PATH_DASHBOARD.profile,
        icon: ICONS.profile,
        roles: ['Admin', 'Staff', 'Doctor'],
      },
      {
        title: 'My Profile',
        path: PATH_DASHBOARD.superAdmin.profile,
        icon: ICONS.profile,
        roles: ['SuperAdmin'],
      },
      {
        title: 'My Profile',
        path: PATH_DASHBOARD.patient.profile,
        icon: ICONS.profile,
        roles: ['Patient'],
      },
      {
        title: 'Manage Users',
        path: PATH_DASHBOARD.users,
        icon: ICONS.users,
        roles: ['Admin', 'Staff', 'Doctor'],
      },
      {
        title: 'Manage Patients',
        path: PATH_DASHBOARD.patients,
        icon: ICONS.patients,
        roles: ['Admin', 'Staff', 'Doctor'],
      },
      {
        title: 'Manage Practises',
        path: PATH_DASHBOARD.superAdmin.practises,
        icon: ICONS.practices,
        roles: ['SuperAdmin'],
      },
      {
        title: 'Logs',
        path: PATH_DASHBOARD.logs,
        icon: ICONS.logs,
        roles: ['Admin', 'Staff', 'Doctor'],
      },
      {
        title: 'Logs',
        path: PATH_DASHBOARD.superAdmin.logs,
        icon: ICONS.logs,
        roles: ['SuperAdmin'],
      },
      {
        title: 'Content',
        path: PATH_DASHBOARD.patient.fertilityContent,
        icon: ICONS.fertility,
        roles: ['Patient'],
      },
      {
        title: 'My Consents',
        path: PATH_DASHBOARD.patient.myConsents,
        icon: ICONS.consents,
        roles: ['Patient'],
      },
    ],
  },
];

export default navConfig;
