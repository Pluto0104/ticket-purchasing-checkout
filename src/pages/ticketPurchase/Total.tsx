import * as React from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import {
  PurchaseContext,
  PurchaseContextDataType,
} from "../../app/PurchaseProvider";

const Total = () => {
  const { shows, showId, quantity, deliveryType, securityCode, errorMsg } =
    React.useContext<PurchaseContextDataType>(PurchaseContext);

  const show = shows.find((show) => show.id === showId);
  const price = show?.price || 0;
  const qty = quantity || 0;
  const serviceFeePerTicket = price * 0.2;
  const serviceFee = serviceFeePerTicket * qty;
  const orderProcessingFee = 2.95;
  const total = serviceFee + orderProcessingFee + price * qty;
  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h6" fontWeight={500}>
          Total
        </Typography>
        <Typography variant="h6" fontWeight={500}>
          ${total.toFixed(2)}
        </Typography>
      </Stack>
      {price * qty > 0 && (
        <>
          <Stack>
            <Stack>
              <Typography variant="body1" fontWeight={500}>
                Tickets
              </Typography>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2">
                  Resale Tickets: ${price} x {qty}
                </Typography>
                <Typography variant="body2">
                  ${(price * qty).toFixed(2)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <Typography variant="body1" fontWeight={500}>
              Notes From Seller
            </Typography>
            <Typography variant="body2">{show?.note}</Typography>
          </Stack>
        </>
      )}
      <Stack>
        <Typography variant="body1" fontWeight={500}>
          Fees
        </Typography>

        {serviceFee > 0 && (
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">
              Service Fee: ${serviceFeePerTicket.toFixed(2)} x {qty}
            </Typography>
            <Typography variant="body2">${serviceFee.toFixed(2)}</Typography>
          </Stack>
        )}
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2">Order Processing Fee</Typography>
          <Typography variant="body2">
            ${orderProcessingFee.toFixed(2)}
          </Typography>
        </Stack>
      </Stack>
      {deliveryType != null && (
        <Stack>
          <Typography variant="body1" fontWeight={500}>
            Delivery
          </Typography>
          <Stack direction="row" justifyContent="space-between">
            {deliveryType === 0 ? (
              <>
                <Typography variant="body2">Mobile Entry</Typography>
                <Typography variant="body2">Free</Typography>
              </>
            ) : (
              <>
                <Typography variant="body2">Will Call</Typography>
                <Typography variant="body2">Free</Typography>
              </>
            )}
          </Stack>
        </Stack>
      )}
      <Stack spacing={1}>
        <Link href="#" underline="none" mb={2}>
          Cancel Order
        </Link>
        <Typography variant="body1" fontWeight={500}>
          * All Sales Final - No Refunds
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography variant="body1" fontWeight={500}>
              I have read and agree to the current{" "}
              <Link href="#" underline="none">
                Terms of Use
              </Link>
            </Typography>
          }
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          disabled={!securityCode || !!errorMsg}
        >
          Place Order
        </Button>
      </Stack>
      <Typography variant="caption">
        *Exceptions may apply, see our Terms of use.
      </Typography>
    </Stack>
  );
};

export default Total;
