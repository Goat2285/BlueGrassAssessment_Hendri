// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_DASHBOARD_SUPER_ADMIN = '/superadmin/dashboard';
const ROOTS_DASHBOARD_PATIENT = '/patient/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  app: path(ROOTS_DASHBOARD, '/app'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
  users: path(ROOTS_DASHBOARD, '/users'),
  patients: path(ROOTS_DASHBOARD, '/patients'),
  logs: path(ROOTS_DASHBOARD, '/logs'),
  superAdmin: {
    app: path(ROOTS_DASHBOARD_SUPER_ADMIN, '/app'),
    profile: path(ROOTS_DASHBOARD_SUPER_ADMIN, '/profile'),
    practises: path(ROOTS_DASHBOARD_SUPER_ADMIN, '/practises'),
    logs: path(ROOTS_DASHBOARD_SUPER_ADMIN, '/logs'),
  },
  patient: {
    app: path(ROOTS_DASHBOARD_PATIENT, '/app'),
    profile: path(ROOTS_DASHBOARD_PATIENT, '/profile'),
    fertilityContent: path(ROOTS_DASHBOARD_PATIENT, '/fertility-content'),
    myConsents: path(ROOTS_DASHBOARD_PATIENT, '/my-consents'),
  },
};
