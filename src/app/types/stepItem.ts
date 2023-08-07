export type StepperPropType = {
  steps: StepType[];
  disableNextBtn?: boolean;
  disableBackBtn?: boolean;
  disableReset?: boolean;
};

export type StepType = {
  label: string;
  description: string;
  children: React.ReactNode;
};
