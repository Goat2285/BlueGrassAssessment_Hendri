// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
};

export default function RHFDatePicker({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          value={field.value}          
          views={['day']}
          onChange={field.onChange}
          renderInput={(field) => (
            <TextField
              {...field}
              fullWidth
              value={field.value}
              error={!!error}
              helperText={error?.message}
              sx={{
                "& .MuiInputLabel-root": { color: "text.disabled" },
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": { borderColor: "text.disabled" },
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
