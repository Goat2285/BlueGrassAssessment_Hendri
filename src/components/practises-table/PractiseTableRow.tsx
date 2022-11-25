import { RowProps } from './PractisesTable';
// @mui
import { Stack, TableRow, TableCell, Typography } from '@mui/material';
// form
import { useForm } from 'react-hook-form';
// components
import Iconify from '../iconify';
import { format } from 'date-fns';
import { IconButtonAnimate } from 'src/components/animate';
import FormProvider, { RHFSwitch } from '../hook-form';
import { useSnackbar } from '../snackbar';
import { useState } from 'react';

type Props = {
  row: RowProps;
};

type FormValuesProps = {
  id: number;
  name?: string;
  telephone?: string;
  email: string;
  createDate: string;
  status: boolean;
};

export default function PractiseTableRow({ row }: Props) {
  const { id, name, telephone, email, createDate, status } = row;

  const [active, setActive] = useState(status);

  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    id: id,
    name: name,
    telephone: telephone,
    email: email,
    createDate: createDate,
    status: status,
  };

  const methods = useForm<FormValuesProps>({
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onChange = async (data: FormValuesProps) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      enqueueSnackbar('Update success!');
      console.log(data);
      setActive(data.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TableRow hover>
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
            <RHFSwitch name="status" labelPlacement="end" label={active ? 'Active' : 'Disabled'} />
          </FormProvider>
        </TableCell>

        <TableCell align="right">
          <Typography component="div" noWrap>
            <IconButtonAnimate sx={{ color: 'primary.main' }}>
              <Iconify icon="ri:edit-line" />
            </IconButtonAnimate>
            <IconButtonAnimate sx={{ color: 'primary.main', ml: 0.5 }}>
              <Iconify icon="eva:trash-2-outline" />
            </IconButtonAnimate>
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
}
