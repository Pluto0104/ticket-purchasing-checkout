import * as React from "react";
import ShowsList from "./ShowsList";
import Delivery from "./Delivery";
import Payment from "./Payment";
import CustomStepper from "../../../components/CustomStepper";
import { StepType } from "../../../app/types/stepItem";
import {
  PurchaseContext,
  PurchaseContextDataType,
} from "../../../app/PurchaseProvider";

const steps: StepType[] = [
  {
    label: "Add to Order",
    description: "Add to Order",
    children: <ShowsList />,
  },
  {
    label: "Delivery",
    description: "Select Delivery Type",
    children: <Delivery />,
  },
  {
    label: "Payment",
    description: "Select Payment Type",
    children: <Payment />,
  },
];

const PurchaseStepper = () => {
  const { errorMsg } =
    React.useContext<PurchaseContextDataType>(PurchaseContext);
  return (
    <CustomStepper steps={steps} disableNextBtn={!!errorMsg} disableReset />
  );
};

export default PurchaseStepper;
