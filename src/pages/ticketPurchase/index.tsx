import Grid from "@mui/material/Grid";
import PurchaseProvider from "../../app/PurchaseProvider";
import PurchaseStepper from "./stepper";
import Total from "./Total";

function TicketPurchase() {
  return (
    <PurchaseProvider>
      <Grid container sx={{ p: 2 }}>
        <Grid item sm={12} md={8}>
          <PurchaseStepper />
        </Grid>
        <Grid item sm={12} md={4}>
          <Total />
        </Grid>
      </Grid>
    </PurchaseProvider>
  );
}

export default TicketPurchase;
