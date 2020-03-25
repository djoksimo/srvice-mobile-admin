import StepCardId from 'enums/StepCardId';
export type Step = {
  stepTitle: string;
  component: React.ReactNode;
  id: StepCardId;
};
