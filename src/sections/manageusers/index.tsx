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
import TableUsersData from './TableUsersData';
import Scrollbar from 'src/components/scrollbar';
import UserTableRow from './UserTableRow';
import DashboardWelcome from 'src/components/dashboard-welcome';
import ConfirmDialog from 'src/components/confirm-dialog';
import UserAddForm from './UserAddForm';

const STATUS_OPTIONS = ['all users', 'Doctor', 'Staff'];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'date', label: 'Date Created', align: 'left' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

export default function ManageUsers() {
  const { setPage, onChangePage, onChangeRowsPerPage, page, order, orderBy, rowsPerPage } =
    useTable();

  const [tableData, setTableData] = useState(TableUsersData);

  const [openDialog, setOpenDialog] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all users');

  const [filterName, setFilterName] = useState('');

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStatus,
  });

  const denseHeight = 72;

  const isFiltered = filterName !== '' || filterStatus !== 'all users';

  const isNotFound =
    (!dataFiltered.length && !!filterName) || (!dataFiltered.length && !!filterStatus);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const refetch = () => {
    console.log('Refetch users');
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
            {STATUS_OPTIONS.map((tab) => (
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
                    rowCount={tableData.length}
                    sx={{ borderRadius: 1 }}
                  />

                  <TableBody>
                    {dataFiltered
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <UserTableRow key={row.id} row={row} />
                      ))}

                    <TableEmptyRows
                      height={denseHeight}
                      emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                    />

                    <TableNoData isNotFound={isNotFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </Card>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
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
        content={<UserAddForm closeDialog={closeDialog} refetch={refetch} />}
      />
    </>
  );
}
