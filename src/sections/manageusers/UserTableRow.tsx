// @mui
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { IUserAccountGeneral } from './types';
import { CustomAvatar } from 'src/components/custom-avatar';
import { format } from 'date-fns';
import { GREYS } from 'src/theme/palette';
import { IconButtonAnimate } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
  row: IUserAccountGeneral;
};

export default function UserTableRow({ row }: Props) {
  const { name, avatar, email, role, date } = row;

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar alt={name} src={avatar} name={name} />

            <Stack direction="column">
              <Typography variant="subtitle2" noWrap>
                {name}
              </Typography>
              <Typography variant="body2" noWrap color={GREYS.grey6}>
                {email}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {role}
        </TableCell>

        <TableCell align="left">{format(date, 'MM/dd/yyyy')}</TableCell>

        <TableCell align="right">
          <IconButtonAnimate sx={{ color: 'primary.main' }}>
            <Iconify icon="ri:edit-line" />
          </IconButtonAnimate>
          <IconButtonAnimate sx={{ color: 'primary.main', ml: 1 }}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButtonAnimate>
        </TableCell>
      </TableRow>
    </>
  );
}
