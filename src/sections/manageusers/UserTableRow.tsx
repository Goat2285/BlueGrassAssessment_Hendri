// @mui
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { IUserAccountGeneral } from './types';
import { CustomAvatar } from 'src/components/custom-avatar';
import { format } from 'date-fns';
import { GREYS } from 'src/theme/palette';
import { IconButtonAnimate } from 'src/components/animate';
import ConfirmDialog from 'src/components/confirm-dialog';
import UserEditForm from './UserEditForm';
import { useState } from 'react';
import UserDeleteForm from './UserDeleteForm';

// ----------------------------------------------------------------------

type Props = {
  row: IUserAccountGeneral;
  handleRefetch: () => void;
};

export default function UserTableRow({ row, handleRefetch }: Props) {
  const { id, name, avatar, email, role, date } = row;

  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const closeEditDialog = () => {
    setIsOpenEditDialog(false);
  };

  const closeDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const refetch = () => {
    handleRefetch();
  };

  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };

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
          <IconButtonAnimate sx={{ color: 'primary.main' }} onClick={handleOpenEditDialog}>
            <Iconify icon="ri:edit-line" />
          </IconButtonAnimate>
          <IconButtonAnimate
            sx={{ color: 'primary.main', ml: 0.5 }}
            onClick={handleOpenDeleteDialog}
          >
            <Iconify icon="eva:trash-2-outline" />
          </IconButtonAnimate>
        </TableCell>
      </TableRow>
      <ConfirmDialog
        open={isOpenEditDialog}
        onClose={closeEditDialog}
        title="Edit user"
        content={
          <UserEditForm
            id={id}
            fullname={name}
            email={email}
            role={role}
            closeDialog={closeEditDialog}
            refetch={refetch}
          />
        }
      />
      <ConfirmDialog
        open={isOpenDeleteDialog}
        onClose={closeDeleteDialog}
        sx={{
          '& .MuiDialogTitle-root+.css-dfihuu-MuiDialogContent-root': {
            paddingTop: 1,
          },
        }}
        title="Confirm Delete?"
        content={<UserDeleteForm id={id} closeDialog={closeDeleteDialog} refetch={refetch} />}
      />
    </>
  );
}
