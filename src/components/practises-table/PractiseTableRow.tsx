import { RowProps } from './PractisesTable';
// @mui
import { Stack, TableRow, TableCell, Typography, alpha } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
// components
import Iconify from '../iconify';
import { format } from 'date-fns';
import { IconButtonAnimate } from 'src/components/animate';
import FormProvider, { RHFSwitch } from '../hook-form';
import { useSnackbar } from '../snackbar';
import { useState } from 'react';
import ConfirmDialog from '../confirm-dialog';
import PracticeDeleteForm from 'src/sections/managepractises/PracticeDeleteForm';
import { usePostStatus } from 'src/hooks/api/practices/usePostStatus';
import PracticeEditForm from 'src/sections/managepractises/PracticeEditForm';

type Props = {
  row: RowProps;
  refetch: () => void;
  checkPageAfterDelete: () => void;
};

type FormValuesProps = {
  id: number;
  name?: string;
  telephone?: string;
  email: string;
  createDate: string;
  status: boolean;
};

export default function PractiseTableRow({ row, refetch, checkPageAfterDelete }: Props) {
  const { id, name, telephone, email, createDate, status } = row;

  const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);

  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  const handleOpenEditDialog = () => {
    setIsOpenEditDialog(true);
  };

  const handleOpenDeleteDialog = () => {
    setIsOpenDeleteDialog(true);
  };

  const handleCloseEditDialog = () => {
    setIsOpenEditDialog(false);
  };

  const handleCloseDeleteDialog = () => {
    setIsOpenDeleteDialog(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    id: id,
    status: status,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { mutate: postSubmit } = usePostStatus({
    onSuccess: () => {
      refetch();
      enqueueSnackbar('Status has been changed!');
    },
    onError: () => {
      enqueueSnackbar('Error, status not changed!', { variant: 'error' });
    },
  });

  const { handleSubmit } = methods;

  const onChange = async (data: FormValuesProps) => {
    postSubmit(data);
  };

  return (
    <>
      <TableRow sx={{ height: '72px' }} hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="body2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          {telephone ? (
            <Typography variant="body2" noWrap>
              {telephone}
            </Typography>
          ) : null}
        </TableCell>

        <TableCell align="left">
          {email ? (
            <Typography variant="body2" noWrap>
              {email}
            </Typography>
          ) : null}
        </TableCell>

        <TableCell align="left">
          <Typography variant="body2" noWrap>
            {format(new Date(createDate), 'MM/dd/yyyy')}
          </Typography>
        </TableCell>

        <TableCell align="left">
          <FormProvider methods={methods} onChange={handleSubmit(onChange)}>
            <RHFSwitch
              name="status"
              labelPlacement="end"
              label={status ? 'Active' : 'Disabled'}
              sx={{
                '& .MuiSwitch-root': {
                  '& .MuiSwitch-track': {
                    backgroundColor: (theme) => alpha(theme.palette.grey[500], 0.8),
                  },
                  '& .Mui-checked + .MuiSwitch-track': {
                    backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.32),
                  },
                },
              }}
            />
          </FormProvider>
        </TableCell>

        <TableCell align="left">
          <Typography component="div" noWrap>
            <IconButtonAnimate sx={{ color: 'primary.main' }} onClick={handleOpenEditDialog}>
              <Iconify icon="ri:edit-line" />
            </IconButtonAnimate>
            <IconButtonAnimate
              sx={{ color: 'primary.main', ml: 0.5 }}
              onClick={handleOpenDeleteDialog}
            >
              <Iconify icon="eva:trash-2-outline" />
            </IconButtonAnimate>
          </Typography>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={isOpenEditDialog}
        onClose={handleCloseEditDialog}
        title="Edit Practise"
        content={
          <PracticeEditForm
            closeDialog={handleCloseEditDialog}
            refetch={refetch}
            id={row.id}
            name={row.name}
            email={row.email}
            practiceNumber={row.practiceNumber}
            registrationNumber={row.registrationNumber}
            physicalAddress={row.physicalAddress}
            telephone={row.telephone}
            status={row.status}
          />
        }
      />

      <ConfirmDialog
        open={isOpenDeleteDialog}
        onClose={handleCloseDeleteDialog}
        sx={{
          '& .MuiDialogContent-root': {
            paddingTop: '8px !important',
          },
        }}
        title="Confirm Delete?"
        content={
          <PracticeDeleteForm
            id={id}
            closeDialog={handleCloseDeleteDialog}
            refetch={refetch}
            checkPageAfterDelete={checkPageAfterDelete}
          />
        }
      />
    </>
  );
}
