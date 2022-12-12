// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  disabled?: boolean;
};

export default function RHFDatePicker({ name, disabled, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          value={field.value}
          views={['day', 'year']}
          onChange={field.onChange}
          disabled={disabled}
          renderInput={(field) => (
            <TextField
              {...field}
              fullWidth
              value={field.value}
              error={!!error}
              helperText={error?.message}
              sx={{
                '& .MuiInputLabel-root': { color: 'text.disabled' },
                '& .MuiOutlinedInput-root': {
                  '& > fieldset': { borderColor: 'text.disabled' },
                },
              }}
              {...other}
            />
          )}
        />
      )}
    />
  );
}
