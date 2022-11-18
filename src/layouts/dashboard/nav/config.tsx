// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  dashboard: <SvgColor src="/assets/images/icons/ic_dashboard.svg" sx={{ height: '18.33px', color: 'primary.main' }} />,
  profile: <SvgColor src="/assets/images/icons/ic_profile.svg" sx={{ height: '18.33px', color: 'primary.main' }} />,
  users: <SvgColor src="/assets/images/icons/ic_users.svg" sx={{ height: '18.33px', color: 'primary.main' }} />,
  patients: <SvgColor src="/assets/images/icons/ic_patients.svg" sx={{ height: '18.33px', color: 'primary.main' }} />,
  logs: <SvgColor src="/assets/images/icons/ic_logs.svg" sx={{ height: '18.33px', color: 'primary.main' }} />,
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.app, icon: ICONS.dashboard },
      { title: 'My Profile', path: PATH_DASHBOARD.profile, icon: ICONS.profile },
      { title: 'Manage Users', path: PATH_DASHBOARD.users, icon: ICONS.users },
      { title: 'Manage Patients', path: PATH_DASHBOARD.patients, icon: ICONS.patients },
      { title: 'Logs', path: PATH_DASHBOARD.logs, icon: ICONS.logs },
    ],
  },
];

export default navConfig;