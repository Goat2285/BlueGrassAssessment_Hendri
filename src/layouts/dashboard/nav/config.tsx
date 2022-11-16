// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  user: icon('ic_user'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.app, icon: ICONS.dashboard },
      { title: 'My Profile', path: PATH_DASHBOARD.profile, icon: ICONS.user },
      { title: 'Manage Users', path: PATH_DASHBOARD.users, icon: ICONS.analytics },
      { title: 'Manage Patients', path: PATH_DASHBOARD.patients, icon: ICONS.analytics },
      { title: 'Logs', path: PATH_DASHBOARD.logs, icon: ICONS.ecommerce },
    ],
  },
];

export default navConfig;