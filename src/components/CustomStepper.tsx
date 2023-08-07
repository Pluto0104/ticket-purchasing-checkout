import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { StepperPropType } from "../app/types/stepItem";

const CustomStepper: React.FC<StepperPropType> = ({
  steps,
  disableBackBtn = false,
  disableNextBtn = false,
  disableReset = false,
}) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                <Typography variant="caption">{step.description}</Typography>
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.children}
              <Stack sx={{ mb: 2 }} direction="row" justifyContent="end">
                <Button
                  disabled={disableNextBtn}
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    mt: 1,
                    mr: 1,
                    display:
                      disableReset && index === steps.length - 1
                        ? "none"
                        : "block",
                  }}
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0 || disableBackBtn}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Stack>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {!disableReset && activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </>
  );
};

export default CustomStepper;
