import * as React from "react";
import Stack from "@mui/material/Stack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AddCardIcon from "@mui/icons-material/AddCard";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import {
  PurchaseContext,
  PurchaseContextDataType,
} from "../../../app/PurchaseProvider";

const Payment = () => {
  const {
    paymentType,
    securityCode,
    errorMsg,
    setPaymentType,
    setSecurityCode,
    setErrorMsg,
  } = React.useContext<PurchaseContextDataType>(PurchaseContext);

  React.useEffect(() => {
    setPaymentType(0);
    setErrorMsg("Please input correct security code.");
  }, []);

  React.useEffect(() => {
    if (paymentType == null) setErrorMsg("Please select payment type.");
    else if (!securityCode) setErrorMsg("Please input security code.");
    else if (securityCode) {
      const regex = /^\d{3}$/;
      const isValid = regex.test(securityCode);
      setErrorMsg(isValid ? null : "Please input correct security code.");
    } else setErrorMsg(null);
  }, [paymentType, securityCode]);

  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(parseInt(event.target.value));
  };

  const handleChangeSecurityCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecurityCode(event.target.value);
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel
          id="demo-controlled-radio-buttons-group"
          sx={{ fontWeight: 500, color: "black" }}
        >
          Use Credit / Debit Card
        </FormLabel>
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={paymentType}
          onChange={handleChangeRadio}
        >
          <FormControlLabel
            sx={{ alignItems: "start" }}
            value={0}
            control={<Radio />}
            label={
              <>
                <Stack direction="row" sx={{ mb: 2 }}>
                  <Avatar
                    variant="square"
                    alt="visa-payment-icon"
                    src="/visa.jpg"
                  />
                  <Box>
                    <Typography variant="body1" fontWeight={500} my={1}>
                      Visa - 9999
                    </Typography>
                    <Typography variant="body2" fontWeight={300}>
                      User Name | exp. 00/11
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <Link href="#" underline="none">
                        Edit
                      </Link>
                      <Divider orientation="vertical" flexItem />
                      <Link href="#" underline="none">
                        Delete
                      </Link>
                    </Stack>
                  </Box>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <TextField
                    type="password"
                    label="Security Code"
                    inputProps={{
                      maxLength: 3,
                    }}
                    value={securityCode || ""}
                    onChange={handleChangeSecurityCode}
                    placeholder="***"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {!errorMsg ? (
                            <CheckIcon color="success" />
                          ) : (
                            <CloseIcon color="error" />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                  <img
                    src="/3-digits-on-back-of-card.png"
                    alt="3-digits-on-back-of-card"
                  />
                  <Typography>3-digits on back of card</Typography>
                </Stack>
              </>
            }
          />
        </RadioGroup>
      </FormControl>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ cursor: "pointer" }}
      >
        <AddIcon color="info" />
        <AddCardIcon />
        <Link href="#" variant="body1" underline="none" fontWeight={500} my={1}>
          Add New Card
        </Link>
      </Stack>
      <Divider />
      <Stack>
        <FormLabel sx={{ fontWeight: 500, color: "black" }}>
          Or Pay With
        </FormLabel>
        <Typography>
          By using a digital wallet and continuing past this page, you have read
          and accepting the&nbsp;
          <Link
            href="#"
            variant="body1"
            underline="none"
            fontWeight={500}
            my={1}
          >
            Term of use
          </Link>
          .
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Payment;
