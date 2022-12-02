import {
  Card,
  CardHeader,
  CardProps,
  Box,
  Button,
  Divider,
  Table,
  TableContainer,
  TableBody,
} from '@mui/material';
import { useState } from 'react';
import PractisesTableToolbar from './PractisesTableToolbar';
import {
  emptyRows,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  useTable,
} from '../table';
import Iconify from '../iconify';
import { useNavigate } from 'react-router';
import Scrollbar from '../scrollbar';
import { applyFilter, getComparator } from './utilis';
import PractiseTableRow from './PractiseTableRow';

type TableHead = {
  id: string;
  label: string;
  align: string;
};

export type RowProps = {
  name?: string;
  email?: string;
  physicalAddress?: string;
  practiceNumber?: string;
  registrationNumber?: string;
  status: boolean;
  telephone?: string;
  id: number;
  createDate: string;
};

interface Props extends CardProps {
  title?: string;
  tableRows: RowProps[] | undefined;
  searchable: boolean;
  hasPagination: boolean;
  hasMore: boolean;
  tableHeads: TableHead[];
  refetch: () => void;
}

export default function PractisesTable({
  title,
  tableRows,
  searchable,
  hasPagination,
  hasMore,
  tableHeads,
  refetch,
  sx,
  ...other
}: Props) {
  const { setPage, onChangePage, onChangeRowsPerPage, page, order, orderBy, rowsPerPage } =
    useTable();

  const navigate = useNavigate();

  const [filterPractiseName, setFilterPractiseName] = useState('');

  const dataFiltered = applyFilter({
    inputData: tableRows,
    comparator: getComparator(order, orderBy),
    filterPractiseName,
  });

  const denseHeight = 72;

  const isFiltered = filterPractiseName !== '';

  const isNotFound = (!dataFiltered?.length && !!filterPractiseName) || !tableRows;

  const handleFilterPractiseName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setFilterPractiseName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterPractiseName('');
  };

  return (
    <Card sx={sx} {...other}>
      {title ? <CardHeader title={title} sx={{ mb: 3 }} /> : null}
      {searchable ? (
        <PractisesTableToolbar
          isFiltered={isFiltered}
          filterName={filterPractiseName}
          onFilterName={handleFilterPractiseName}
          onResetFilter={handleResetFilter}
        />
      ) : null}

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Card sx={{ px: 1, borderRadius: 0 }}>
          <Scrollbar>
            <Table sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={tableHeads}
                rowCount={tableRows?.length}
                sx={{ borderRadius: 1 }}
              />

              <TableBody>
                {dataFiltered
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <PractiseTableRow key={row.id} row={row} refetch={refetch} />
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(page, rowsPerPage, tableRows ? tableRows.length : 0)}
                />

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </TableContainer>

      {hasPagination ? (
        <TablePaginationCustom
          count={dataFiltered ? dataFiltered.length : 0}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
          sx={{ bgcolor: 'common.white' }}
        />
      ) : null}

      {hasMore ? (
        <>
          <Divider />
          <Box
            sx={{
              p: 2,
              textAlign: 'right',
              display: 'flex',
              justifyContent: 'right',
              alignItems: 'center',
            }}
          >
            <Button
              size="small"
              endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}
              onClick={() => {
                navigate('/admin/logs');
              }}
            >
              See All
            </Button>
          </Box>
        </>
      ) : null}
    </Card>
  );
}
