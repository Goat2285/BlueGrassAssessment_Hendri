import {
  Stack,
  Button,
  Card,
  Tabs,
  Tab,
  Divider,
  Table,
  TableContainer,
  TableBody,
} from '@mui/material';
import { useState } from 'react';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '../../components/table';
import UserTableToolbar from './UserTableToolbar';
import { applyFilter, getComparator } from './utils';
import Scrollbar from 'src/components/scrollbar';
import UserTableRow from './UserTableRow';
import DashboardWelcome from 'src/components/dashboard-welcome';
import { useGetUsers } from 'src/hooks/api/users/useGetUsers';
import { useGetRoles } from 'src/hooks/api/roles/useGetRoles';
import ConfirmDialog from 'src/components/confirm-dialog';
import UserAddForm from './UserAddForm';
import { useQueryClient } from '@tanstack/react-query';

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'date', label: 'Date Created', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function ManageUsers() {
  const { setPage, onChangePage, onChangeRowsPerPage, page, order, orderBy, rowsPerPage } =
    useTable();

  const queryClient = useQueryClient();

  const { data: users } = useGetUsers();

  const { data: roles } = useGetRoles();

  const ROLE_OPTIONS = roles ? ['all users', ...roles] : ['all users'];

  const [openDialog, setOpenDialog] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all users');

  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const denseHeight = 72;

  const isFiltered = filterName !== '' || filterStatus !== 'all users';

  const isNotFound =
    (!dataFiltered?.length && !!filterName) || (!dataFiltered?.length && !!filterStatus);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const refetch = () => {
    queryClient.refetchQueries(['getUsers']);
  };

  const handleFilterStatus = (event: React.SyntheticEvent<Element, Event>, newValue: string) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all users');
  };

  const handleCheckPageAfterDelete = () => {
    if (page > 0) {
      if (dataFiltered?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).length === 1) {
        setPage(page - 1);
      }
    }
  };

  return (
    <>
      <Stack>
        <DashboardWelcome
          title="Manage Users"
          subtitle="Add new staff members or manage existing users"
          action={
            <Button
              variant="contained"
              size="medium"
              sx={{ lineHeight: 22 / 14, fontWeight: 'fontWeightMedium' }}
              onClick={handleOpenDialog}
            >
              Add User
            </Button>
          }
          sx={{ mt: 4 }}
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {ROLE_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <UserTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            onFilterName={handleFilterName}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <Card sx={{ px: 1, borderRadius: 0 }}>
              <Scrollbar>
                <Table sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={users?.length}
                    sx={{ borderRadius: 1 }}
                  />

                  <TableBody>
                    {dataFiltered
                      ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <UserTableRow
                          key={row.id}
                          row={row}
                          handleRefetch={refetch}
                          checkPageAfterDelete={handleCheckPageAfterDelete}
                          allRoles={roles}
                        />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, users ? users.length : 0)}
                    />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered ? dataFiltered.length : 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            sx={{ bgcolor: 'common.white' }}
          />
        </Card>
      </Stack>
      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        title="Add new user"
        content={<UserAddForm closeDialog={handleCloseDialog} refetch={refetch} roles={roles} />}
      />
    </>
  );
}
