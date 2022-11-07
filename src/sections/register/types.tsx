export type StepperProps = {
  currentStep: number;
  steps: { 
    step: number;
    label: string; 
    key: string;
  }[]  
}

export type Step1Props = {
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: number;
  nationality: string;
  idnumber: number;
  address: string;
  dateofbirth: string;
};

export type Step2Props = {
  haspartner: boolean,
  firstname: string;
  lastname: string;
  email: string;
  contactnumber: number;
  nationality: string;
  idnumber: number;
  address: string;
  dateofbirth: string;
};

export type Step3Props = {  
  nameoncard: string;
  cardnumber: number;
  expirydate: string;
  cvv: number;
  afterSubmit?: string;
};
