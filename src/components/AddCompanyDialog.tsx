import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
  } from "@material-ui/core";
  import React from "react";
  
  export function AddCompanyDialog({ open, handleClose, add }: any) {
    const [data, setData] = React.useState({
      name: "",
      shortName: "",
      totalShares: 0,
      pricePerShare: 0,
      currency: "USD",
      updatedDate: (new Date()).toUTCString()
    });
  
    const handleSubmit = () => {
        add(data);
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
                  label="Company name"
                  type="text"
                  value={data.name}
                  onChange={(e) => {
                    setData({ ...data, name: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Company Code"
                  type="text"
                  value={data.shortName}
                  onChange={(e) => {
                    setData({ ...data, shortName: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Total Shares"
                  type="number"
                  value={data.totalShares}
                  onChange={(e) => {
                    setData({ ...data, totalShares: parseFloat(e.target.value) });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Price Per Share in USD"
                  type="number"
                  value={data.pricePerShare}
                  onChange={(e) => {
                    setData({ ...data, pricePerShare: parseFloat(e.target.value) });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            autoFocus
          >
            Save
          </Button>
          <Button onClick={handleClose} color="primary">
            Back
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  