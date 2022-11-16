import { Dispatch, SetStateAction } from "react";

export type StepperProps = {
  currentStep: number;
  steps: { 
    step: number;
    tickLabel?: string; 
    header?: string;
    headerDescription?: string;
    key: string;
  }[]  
}

export type Step1Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export type Step2Props = {
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export type Step3Props = {  
  setCurrentStep: Dispatch<SetStateAction<number>>;
};

export type FormValuesProps = Step1Props & Step2Props & Step3Props