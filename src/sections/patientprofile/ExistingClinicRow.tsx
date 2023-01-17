import { TableRow, TableCell, Typography } from '@mui/material';
import { IPracticeResponse } from 'src/services/api/practices/getPractices';

type Props = {
  row: IPracticeResponse;
  handlePatientTransfer: () => void;
};

export default function ExistingClinicRow({ row, handlePatientTransfer }: Props) {
  const { name, physicalAddress } = row;

  const savePatientDataToStorage = () => {
    handlePatientTransfer();
  };

  return (
    <TableRow hover sx={{ cursor: 'pointer', height: '72px' }} onClick={savePatientDataToStorage}>
      <TableCell align="left">
        <Typography variant="body2">{name}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body2">{physicalAddress}</Typography>
      </TableCell>
    </TableRow>
  );
}
