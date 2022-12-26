import { Stack, Typography, Table, TableContainer, Card, TableBody } from '@mui/material';
import { useState } from 'react';
import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom, TableNoData, useTable } from 'src/components/table';
import { useGetPractices } from 'src/hooks/api/practices/useGetPractices';
import ExistingClinicRow from './ExistingClinicRow';
import ExistingClinicToolbar from './ExistingClinicToolbar';
import { applyFilter, getComparator } from './utilis';

const TABLE_HEAD = [
  { id: 'clinic', label: 'Clinic', align: 'left' },
  { id: 'address', label: 'Address', align: 'left' },
];

type Props = {
  handlePatientTransfer: () => void;
};

export default function SearchClinic({ handlePatientTransfer }: Props) {
  const { order, orderBy } = useTable();

  const [filterName, setFilterName] = useState('');

  const { data: practices } = useGetPractices();

  const dataFiltered = applyFilter({
    inputData: practices,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const isFiltered = filterName !== '';

  const isNotFound = !dataFiltered?.length && !!filterName;

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  return (
    <Stack>
      <Typography variant="body1" sx={{ textAlign: 'center', color: 'grey.600', mb: 4 }}>
        Search for a clinic on the My Fertility Journey network
      </Typography>

      <ExistingClinicToolbar
        filterName={filterName}
        isFiltered={isFiltered}
        onResetFilter={handleResetFilter}
        onFilterName={handleFilterName}
      />

      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Card sx={{ px: 1, borderRadius: 0, boxShadow: 'none' }}>
          <Scrollbar sx={{ maxHeight: 450 }}>
            <Table sx={{ minWidth: 500 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered ? dataFiltered.length : 0}
                sx={{ borderRadius: 1 }}
              />

              <TableBody>
                {dataFiltered?.map((row) => (
                  <ExistingClinicRow
                    key={row.id}
                    row={row}
                    handlePatientTransfer={handlePatientTransfer}
                  />
                ))}

                <TableNoData isNotFound={isNotFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>
      </TableContainer>
    </Stack>
  );
}
