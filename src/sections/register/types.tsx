import { Dispatch, SetStateAction } from 'react';

export type StepperProps = {
  currentStep: number;
  steps: {
    step: number;
    tickLabel?: string;
    header?: string;
    headerDescription?: string;
    key: string;
  }[];
};

export type Step1Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  email?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  nationality?: string;
  idOrPassport?: string;
  address?: string;
  dateOfBirth?: string;
  memberKey: string;
  token: string;
  refetch: () => void;
};

export type Step2Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  email?: string;
  firstName?: string;
  lastName?: string;
  contactNumber?: string;
  nationality?: string;
  idOrPassport?: string;
  address?: string;
  dateOfBirth?: string;
  memberKey: string;
  token: string;
  refetch: () => void;
};

export type Step3Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  refetch: () => void;
};

export type FormValuesProps = Step1Props & Step2Props & Step3Props;
