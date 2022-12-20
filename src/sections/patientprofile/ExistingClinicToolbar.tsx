import { Button, InputAdornment, Stack, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';

type Props = {
  filterName: string;
  isFiltered: boolean;
  onResetFilter: () => void;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ExistingClinicToolbar({
  filterName,
  isFiltered,
  onResetFilter,
  onFilterName,
}: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      sx={{ mb: 4 }}
    >
      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search Clinics..."
        label="Search Clinics"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'common.black' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
