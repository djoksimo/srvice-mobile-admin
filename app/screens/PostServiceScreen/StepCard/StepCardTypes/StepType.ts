// @flow
import type { Element } from "react";
import StepCardId from "../../../../enums/StepCardId";

export type Step = {
  stepTitle: string,
  component: Element<any>,
  id: StepCardId,
};
