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
  
  export function AddCurrencyDialog({ open, handleClose, add }: any) {
    const [data, setData] = React.useState({
      name: "",
      code: "",
      rateInUsd: 0,
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
                  label="Currency name"
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
                  label="Currency Code"
                  type="text"
                  value={data.code}
                  onChange={(e) => {
                    setData({ ...data, code: e.target.value });
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  style={{ width: "100%" }}
                  label="Rate In USD"
                  type="number"
                  value={data.rateInUsd}
                  onChange={(e) => {
                    setData({ ...data, rateInUsd: parseFloat(e.target.value) });
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
  