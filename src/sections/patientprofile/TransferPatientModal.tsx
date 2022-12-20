import { useState } from 'react';
import SearchClinic from './SearchClinic';
import TransferPatient from './TransferPatient';

type Props = {
  closeDialog: () => void;
  changeDialogTitle: (title: string) => void;
};

export default function TransferPatientModal({ closeDialog, changeDialogTitle }: Props) {
  const [isSearchClinicsOpen, setIsSearchClinicsOpen] = useState(true);
  const [isTransferPatientOpen, setIsTransferPatientOpen] = useState(false);

  const handlePatientTransfer = () => {
    setIsSearchClinicsOpen(false);
    setIsTransferPatientOpen(true);
    changeDialogTitle('Transfer Clinic');
  };

  return (
    <>
      {isSearchClinicsOpen ? <SearchClinic handlePatientTransfer={handlePatientTransfer} /> : null}
      {isTransferPatientOpen ? <TransferPatient closeDialog={closeDialog} /> : null}
    </>
  );
}
