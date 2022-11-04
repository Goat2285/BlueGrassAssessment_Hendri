import { Helmet } from 'react-helmet-async';

// Component
import AccountDisabled from '../sections/disableduser'
// ----------------------------------------------------------------------


// Seperate page is used for disabled user response due to the difference in base layout 

export default function AccountDisabledPage() {
  return (
    <>
      <Helmet>
        <title>AccountDisabled</title>
      </Helmet>
      <AccountDisabled />     
    </>
  );
}
