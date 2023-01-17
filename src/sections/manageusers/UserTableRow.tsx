// @mui
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { CustomAvatar } from 'src/components/custom-avatar';
import { format } from 'date-fns';
import { GREYS } from 'src/theme/palette';
import { IconButtonAnimate } from 'src/components/animate';
import ConfirmDialog from 'src/components/confirm-dialog';
import UserEditForm from './UserEditForm';
import { useState } from 'react';
import UserDeleteForm from './UserDeleteForm';
import { IUserResponse } from 'src/services/api/users/getUsers';

// ----------------------------------------------------------------------

type Props = {
  row: IUserResponse;
  allRoles?: string[];
  handleRefetch: () => void;
  checkPageAfterDelete: () => void;
};

export default function UserTableRow({
  row,
  allRoles,
  handleRefetch,
  checkPageAfterDelete,
}: Props) {
  const { firstname, lastname, profilePictureUrl, email, roles, createDate, id } = row;

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
      <TableRow sx={{ height: '72px' }} hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <CustomAvatar
              alt={`${firstname} ${lastname}`}
              src={profilePictureUrl}
              name={`${firstname} ${lastname}`}
            />

            <Stack direction="column">
              <Typography variant="subtitle2" noWrap>
                {`${firstname} ${lastname}`}
              </Typography>
              <Typography variant="body2" noWrap color={GREYS.grey6}>
                {email}
              </Typography>
            </Stack>
          </Stack>
        </TableCell>

        <TableCell align="left" sx={{ textTransform: 'capitalize' }}>
          {roles[0]}
        </TableCell>

        <TableCell align="left">{format(new Date(createDate), 'MM/dd/yyyy')}</TableCell>

        <TableCell align="left">
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
            firstName={firstname}
            lastName={lastname}
            email={email}
            role={roles[0]}
            closeDialog={closeEditDialog}
            refetch={refetch}
            roles={allRoles}
          />
        }
      />
      <ConfirmDialog
        open={isOpenDeleteDialog}
        onClose={closeDeleteDialog}
        sx={{
          '& .MuiDialogContent-root': {
            paddingTop: '8px !important',
          },
        }}
        title="Confirm Delete?"
        content={
          <UserDeleteForm
            id={id}
            closeDialog={closeDeleteDialog}
            refetch={refetch}
            checkPageAfterDelete={checkPageAfterDelete}
          />
        }
      />
    </>
  );
}
