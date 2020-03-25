import {Step} from './StepType';
export type StepCardProps = {
  children?: any;
  stepNumber: number;
  stepCount: number;
  onContinuePressed: Function;
  onImagePickerPressed: Function;
  step: Step;
  pictures: Array<any>;
  isPostButtonPressed: boolean;
  isLoading: boolean;
};
