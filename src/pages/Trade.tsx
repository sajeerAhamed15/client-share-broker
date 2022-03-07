/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import {
  getCurrentCompany,
  getUserId,
  isUserLoggedIn,
  saveCurrentCompany,
} from "../utils/UserUtils";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FirstDataRenderedEvent } from "ag-grid-community";

export function Trade() {
  const history = useHistory();
  const [rowData, setRowData] = useState<any>([]);
  const [type, setType] = useState(null);
  const [numOfShares, setNumOfShares] = useState(0);
  const [totAmount, setTotAmount] = useState(0);
  const [priceInUSD, setPriceInUSD] = useState(0);
  const [pricePerShare, setPricePerShare] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [companyCode, setCompanyCode] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [gridApi, setGridApi] = useState<any>(null);

  const [columnDefs] = useState([
    { field: "name", headerName: "Company Name" },
    { field: "shortName", headerName: "Company Code" },
    { field: "totalShares", headerName: "Unissued Shares" },
    { field: "currency", headerName: "Currency" },
    { field: "pricePerShare", headerName: "Price Per Share" },
    { field: "updatedDate", headerName: "Last Updated Date" },
    { field: "ownedShares", headerName: "Owned Shares" },
  ]);

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (!isLoggedIn) {
      history.push("/login");
    }

    const currCompany = getCurrentCompany();
    if (!currCompany) {
      history.push("/dashboard");
    } else {
      setRowData([currCompany]);
      setType(currCompany["type"]);
      setPriceInUSD(currCompany["pricePerShareInUSD"]);
      setSelectedCurrency(currCompany["currency"]);
      setCompanyCode(currCompany["shortName"]);
      setPricePerShare(currCompany["pricePerShare"]);
    }
  }, []);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:9191/v1/currency/get-all-curr-code",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setCurrencyCodes(data));
  }, []);

  useEffect(() => {
    if (rowData.length > 0 && gridApi) {
      gridApi.redrawRows();
    }
  }, [rowData]);

  useEffect(() => {
    if (rowData.length > 0) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `http://localhost:9191/v1/currency/exchange-rate?from=USD&to=${selectedCurrency}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const tempData = [...rowData];
          tempData.forEach((row: any) => {
            row["currency"] = selectedCurrency;
            row["pricePerShare"] = (priceInUSD * parseFloat(data)).toFixed(2);
          });
          setRowData(tempData);
          
          setPricePerShare(parseFloat((priceInUSD * parseFloat(data)).toFixed(2)));
          setNumOfShares(0)
          setTotAmount(0)
        });
    }
  }, [selectedCurrency]);

  const onBackPressed = () => {
    saveCurrentCompany(null);
    history.push("/dashboard");
  };

  const onCompanyTweetsPressed = () => {
    history.push("/company");
  }

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    event.api.sizeColumnsToFit();
    setGridApi(event.api);
  };

  const handleSubmit = (event: any) => {
    const trade = {
      numShares: numOfShares,
      companyCode: companyCode,
      userId: getUserId(),
      pricePerShare: pricePerShare,
      pricePerShareInUsd: priceInUSD,
      currencyCode: selectedCurrency,
      type: type,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trade),
    };
    fetch("http://localhost:9191/v1/transaction/trade", requestOptions)
      .then((res) => {
        setOpenDialog(true);
      })
      .catch((e) => console.log(e));
    event.preventDefault();
  };

  const handleDialogOnClose = (event: any) => {
    setOpenDialog(false);
    onBackPressed();
    event.preventDefault();
  };

  let selectCurrencyValues =
    currencyCodes &&
    currencyCodes.map((currency: string) => {
      return <option value={currency}>{currency}</option>;
    });

  const handleCurrencyChange = (event: any) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div style={{ margin: 20 }}>
      <Dialog open={openDialog} onClose={handleDialogOnClose}>
        <DialogTitle title={"Congratulation! Your Trade is Successful"} />

        <DialogContent>
          You have traded {numOfShares} shares from {companyCode}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleDialogOnClose}>Back</Button>
        </DialogActions>
      </Dialog>
      <button onClick={onBackPressed}>Back</button>
      <button style={{ marginLeft: 20 }} onClick={onCompanyTweetsPressed}>Show Recent tweets</button>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: 20,
          }}
        >
          <div>{type} Shares</div>
          <Select value={selectedCurrency} onChange={handleCurrencyChange}>
            {selectCurrencyValues}
          </Select>
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: 150, width: "auto", marginTop: 20, marginBottom: 20 }}
        >
          <AgGridReact
            defaultColDef={{
              resizable: true,
              editable: false,
            }}
            enableCellChangeFlash={true}
            rowSelection="single"
            rowData={rowData}
            columnDefs={columnDefs}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Number of Shares:</label>
          <input
            name="NumOfShares"
            type="text"
            value={numOfShares}
            onChange={(e) => {
              setNumOfShares(e.target.value as unknown as number);
              const totAmount =
                (e.target.value as unknown as number) * pricePerShare;
              setTotAmount(parseFloat(totAmount.toFixed(2)));
            }}
            required
          />
          <br />
          <br />
          <label>Total Amount in {selectedCurrency}:</label>
          <input
            name="TotAmount"
            type="text"
            value={totAmount}
            onChange={(e) => {
              setTotAmount(e.target.value as unknown as number);
              const numShares =
                (e.target.value as unknown as number) / pricePerShare;
              setNumOfShares(parseFloat(numShares.toFixed(2)));
            }}
            required
          />
          <br />
          <br />
          <label>Price Per Share in {selectedCurrency}: </label>
          <input
            name="price"
            type="text"
            disabled
            value={pricePerShare}
            onChange={(e) =>
              setPricePerShare(e.target.value as unknown as number)
            }
            required
          />
          <button
            style={{ marginLeft: 20, fontSize: 20, textTransform: "uppercase" }}
          >
            {type}
          </button>
          <br />
        </form>
      </div>
    </div>
  );
}
