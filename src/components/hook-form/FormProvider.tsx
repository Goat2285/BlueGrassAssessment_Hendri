// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  onChange?: VoidFunction;
};

export default function FormProvider({ children, onSubmit, onChange, methods }: Props) {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit} onChange={onChange}>
        {children}
      </form>
    </Form>
  );
}
