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
  app: path(ROOTS_DASHBOARD, '/app'),
  profile: path(ROOTS_DASHBOARD, '/profile'),
  users: path(ROOTS_DASHBOARD, '/users'),
  patients: path(ROOTS_DASHBOARD, '/patients'),
  logs: path(ROOTS_DASHBOARD, '/logs'),
};
