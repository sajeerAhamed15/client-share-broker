import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from "@material-ui/core";
import React from "react";

export function AdvanceSearchDialog({ open, handleClose, search }: any) {
  const [data, setData] = React.useState({
    companyName: "",
    sharePriceStart: "",
    sharePriceEnd: "",
    remainingSharesStart: "",
    remainingSharesEnd: "",
    prevTransaction: false,
    noPrevTransaction: false,
  });

  const handleSearch = () => {
      search(data);
      handleClose();
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Advance Search"}</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                label="Company name (Any part of the name)"
                type="text"
                value={data.companyName}
                onChange={(e) => {
                  setData({ ...data, companyName: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div>Share Price Range</div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                label="Share Start Price (USD)"
                type="number"
                value={data.sharePriceStart}
                onChange={(e) => {
                  setData({ ...data, sharePriceStart: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                label="Share End Price (USD)"
                type="number"
                value={data.sharePriceEnd}
                onChange={(e) => {
                  setData({ ...data, sharePriceEnd: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <div>Remaining Number of Shares</div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                label="Start Value"
                type="number"
                value={data.remainingSharesStart}
                onChange={(e) => {
                  setData({ ...data, remainingSharesStart: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                style={{ width: "100%" }}
                label="End Value"
                type="number"
                value={data.remainingSharesEnd}
                onChange={(e) => {
                  setData({ ...data, remainingSharesEnd: e.target.value });
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    color="primary"
                    checked={data.prevTransaction}
                    onChange={(e) => {
                      setData({ ...data, prevTransaction: e.target.checked });
                    }}
                  />
                }
                label="Companies with previous transaction"
                labelPlacement="end"
              />
              <FormControlLabel
                value="end"
                control={
                  <Checkbox
                    color="primary"
                    checked={data.noPrevTransaction}
                    onChange={(e) => {
                      setData({ ...data, noPrevTransaction: e.target.checked });
                    }}
                  />
                }
                label="Companies with no previous transaction"
                labelPlacement="end"
              />
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSearch}
          color="primary"
          variant="contained"
          autoFocus
        >
          Search
        </Button>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
      </DialogActions>
    </Dialog>
  );
}
