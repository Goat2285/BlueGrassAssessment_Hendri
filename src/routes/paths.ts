// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  login: '/login',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  landing: path(ROOTS_DASHBOARD, '/landing'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
  manageUsers: path(ROOTS_DASHBOARD, '/manage-users'),
  managePatients: path(ROOTS_DASHBOARD, '/manage-patients'),
  logs: path(ROOTS_DASHBOARD, '/logs'),
};
