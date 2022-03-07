/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  getUserId,
  isUserLoggedIn,
  saveCurrentCompany,
  saveUser,
} from "../utils/UserUtils";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FirstDataRenderedEvent } from "ag-grid-community";
import { GridButton } from "../components/GridButton";
import { Button, Select } from "@material-ui/core";

export function Dashboard() {
  const history = useHistory();
  const [companyData, setCompanyData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [defaultRowData, setDefaultRowData] = useState([]);
  const [changed, setChanged] = useState(0);
  const [gridApi, setGridApi] = useState<any>(null);
  const [currencyCodes, setCurrencyCodes] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const [columnDefs] = useState([
    { field: "name", headerName: "Company Name" },
    { field: "shortName", headerName: "Company Code" },
    { field: "totalShares", headerName: "Unissued Shares" },
    { field: "currency", headerName: "Currency" },
    { field: "pricePerShare", headerName: "Price Per Share" },
    { field: "updatedDate", headerName: "Last Updated Date" },
    {
      field: "buy",
      headerName: "Buy",
      cellRenderer: "gridButton",
      cellRendererParams: {
        clicked: function (field: any) {
          saveCurrentCompany({ ...field, type: "buy" });
          history.push("/trade");
        },
        type: "buy",
      },
    },
    { field: "ownedShares", headerName: "Owned Shares" },
    {
      field: "sell",
      headerName: "Sell",
      cellRenderer: "gridButton",
      cellRendererParams: {
        clicked: function (field: any) {
          saveCurrentCompany({ ...field, type: "sell" });
          history.push("/trade");
        },
        type: "sell",
      },
    },
  ]);

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (!isLoggedIn) {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:9191/v1/company/get-all", requestOptions)
      .then((response) => response.json())
      .then((data) => setCompanyData(data));

    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:9191/v1/currency/get-all-curr-code",
      requestOptions1
    )
      .then((response) => response.json())
      .then((data) => setCurrencyCodes(data));
  }, []);

  useEffect(() => {
    if (companyData.length > 0) {
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `http://localhost:9191/v1/transaction/get-by-user-id/${getUserId()}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          const tempData = [...companyData];
          data.forEach((transaction: any) => {
            tempData.forEach((row: any) => {
              if (transaction["companyId"] === row["id"]) {
                row["ownedShares"] =
                  (row["ownedShares"] ? row["ownedShares"] : 0) +
                  transaction["numShares"];
              }
            });
          });
          tempData.forEach((row: any) => {
            row["pricePerShareInUSD"] = row["pricePerShare"];
          });
          setDefaultRowData(tempData);
          setRowData(tempData);
          setChanged(changed + 1);
        });
    }
  }, [companyData]);

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
          const tempData = [...defaultRowData];
          tempData.forEach((row: any) => {
            row["currency"] = selectedCurrency;
            row["pricePerShare"] = (
              row["pricePerShareInUSD"] * parseFloat(data)
            ).toFixed(2);
          });
          setRowData(tempData);
          setChanged(changed + 1);
        });
    }
  }, [selectedCurrency]);

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    event.api.sizeColumnsToFit();
    setGridApi(event.api);
  };

  const handleLogout = () => {
    saveUser(null);
    history.push("/login");
  };

  const handleViewTransaction = () => {
    history.push("/transaction");
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
    <div>
      <div
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          variant="contained"
          style={{ margin: 20 }}
          onClick={handleViewTransaction}
        >
          View My Transactions
        </Button>
        <Button
          variant="outlined"
          style={{ margin: 20 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 20 }}
      >
        <div>Welcome {isUserLoggedIn()}!</div>
        <Select value={selectedCurrency} onChange={handleCurrencyChange}>
          {selectCurrencyValues}
        </Select>
      </div>
      <div
        className="ag-theme-alpine"
        style={{ height: 600, width: "auto", margin: 20 }}
      >
        <AgGridReact
          defaultColDef={{
            resizable: true,
            filter: "agMultiColumnFilter",
            floatingFilter: true,
            headerCheckboxSelectionFilteredOnly: true,
            editable: false,
            sortable: true,
          }}
          enableCellChangeFlash={true}
          statusBar={{
            statusPanels: [
              {
                statusPanel: "agAggregationComponent",
                statusPanelParams: {
                  aggFuncs: ["sum", "avg", "count"],
                },
                align: "left",
              },
            ],
          }}
          frameworkComponents={{
            gridButton: GridButton,
          }}
          sideBar={{
            toolPanels: ["columns", "filters"],
          }}
          rowSelection="single"
          rowData={rowData}
          columnDefs={columnDefs}
          onFirstDataRendered={onFirstDataRendered}
        ></AgGridReact>
      </div>
    </div>
  );
}
