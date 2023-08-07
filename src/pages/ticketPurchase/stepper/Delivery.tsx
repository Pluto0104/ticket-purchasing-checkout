import * as React from "react";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import {
  PurchaseContext,
  PurchaseContextDataType,
} from "../../../app/PurchaseProvider";

const Delivery = () => {
  const { deliveryType, location, setDeliveryType, setLocation, setErrorMsg } =
    React.useContext<PurchaseContextDataType>(PurchaseContext);

  React.useEffect(() => {
    setDeliveryType(0);
    setLocation(0);
  }, []);

  React.useEffect(() => {
    if (deliveryType === undefined || deliveryType === null)
      setErrorMsg("Please select delivery type.");
    else if (location === undefined || location === null)
      setErrorMsg("Please select location.");
    else setErrorMsg(null);
  }, [deliveryType, location]);

  const handleChangeDeliveryType = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryType(parseInt((event.target as HTMLInputElement).value));
  };

  const handleChangeLocation = (
    _: React.MouseEvent<HTMLElement>,
    location: string
  ) => {
    setLocation(parseInt(location || "0"));
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel id="country-button-group">
          Step 1: Select the country your billing address is located:
        </FormLabel>
        <ToggleButtonGroup
          color="primary"
          value={location}
          exclusive
          onChange={handleChangeLocation}
          aria-label="Country"
          aria-labelledby="country-button-group"
        >
          <ToggleButton value={0}>USA</ToggleButton>
          <ToggleButton value={1}>Canada</ToggleButton>
          <ToggleButton value={2}>Mexico/Other Country</ToggleButton>
        </ToggleButtonGroup>
      </FormControl>

      <FormControl>
        <FormLabel id="demo-controlled-radio-buttons-group">
          Step 2: Select how you would like to receive your tickets:
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={deliveryType}
          onChange={handleChangeDeliveryType}
        >
          <FormControlLabel
            sx={{ alignItems: "start" }}
            value={0}
            control={<Radio />}
            label={
              <>
                <Typography variant="body1" fontWeight={500} my={1}>
                  Mobile Delivery - Free
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  Mobile
                </Typography>
                <Typography variant="body1">
                  Your Phone's your ticket. Locate your tickets in your account
                  - or in your app. When you go mobile, your tickets will not be
                  emailed to you or available for print.
                </Typography>
              </>
            }
          />

          <FormControlLabel
            sx={{ alignItems: "start" }}
            value={1}
            control={<Radio />}
            label={
              <>
                <Typography variant="body1" fontWeight={500} my={1}>
                  Will Call
                </Typography>
                <Typography variant="body1">No additional charge</Typography>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
    </Stack>
  );
};

export default Delivery;
