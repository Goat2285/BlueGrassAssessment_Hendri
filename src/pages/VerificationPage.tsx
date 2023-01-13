import { Helmet } from 'react-helmet-async';
import Verification from '../sections/verification';

// ----------------------------------------------------------------------

export default function VerificationPage() {
  return (
    <>
      <Helmet>
        <title>Verification | Fertility Law</title>
      </Helmet>
      <Verification />
    </>
  );
}
