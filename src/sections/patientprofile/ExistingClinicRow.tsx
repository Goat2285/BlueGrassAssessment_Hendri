import { TableRow, TableCell, Typography } from '@mui/material';

export type ISearchPatient = {
  id: number;
  clinic: string;
  address: string;
};

type Props = {
  row: ISearchPatient;
  handlePatientTransfer: () => void;
};

export default function ExistingClinicRow({ row, handlePatientTransfer }: Props) {
  const { clinic, address } = row;

  const savePatientDatatoStorage = () => {
    handlePatientTransfer();
  };

  return (
    <TableRow hover sx={{ cursor: 'pointer', height: '72px' }} onClick={savePatientDatatoStorage}>
      <TableCell align="left">
        <Typography variant="body2">{clinic}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography variant="body2">{address}</Typography>
      </TableCell>
    </TableRow>
  );
}
