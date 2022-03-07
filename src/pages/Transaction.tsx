/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import { getUserId, isUserLoggedIn } from "../utils/UserUtils";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FirstDataRenderedEvent } from "ag-grid-community";

export function Transaction() {
  const history = useHistory();
  const [rowData, setRowData] = useState<any>([]);
  const [rowDataAgg, setRowDataAgg] = useState<any>([]);
  const [gridApi, setGridApi] = useState<any>(null);
  const [gridApiAgg, setGridApiAgg] = useState<any>(null);

  const [columnDefs] = useState([
    { field: "companyName", headerName: "Company Name" },
    { field: "companyCode", headerName: "Company Code" },
    { field: "type", headerName: "Buy/Sell" },
    { field: "numShares", headerName: "Number of Shares" },
    { field: "pricePerShare", headerName: "Price Per Share" },
    { field: "currencyCode", headerName: "Currency" },
    { field: "date", headerName: "Date" },
  ]);

  const [columnDefsAgg] = useState([
    { field: "companyName", headerName: "Company Name" },
    { field: "companyCode", headerName: "Company Code" },
    { field: "numShares", headerName: "Number of Shares" },
    { field: "totalAmountSpendInUSD", headerName: "Total Amount Spent (USD)" },
    { field: "lastPurchasedDate", headerName: "Last Purchased Date" },
  ]);

  useEffect(() => {
    const isLoggedIn = isUserLoggedIn();
    if (!isLoggedIn) {
      history.push("/login");
    }

    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:9191/v1/transaction/get-by-user-id-extended/${getUserId()}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => setRowData(data));

    const requestOptions1 = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `http://localhost:9191/v1/transaction/get-by-user-id-extended-agg/${getUserId()}`,
      requestOptions1
    )
      .then((response) => response.json())
      .then((data) => {
        (data).map((i: any) => {
          i["totalAmountSpendInUSD"] = parseFloat(
            i["totalAmountSpendInUSD"]
          ).toFixed(2);
        });
        setRowDataAgg(data);
      });
  }, []);

  useEffect(() => {
    if (rowData.length > 0 && gridApi) {
      gridApi.redrawRows();
    }
  }, [rowData]);

  useEffect(() => {
    if (rowDataAgg.length > 0 && gridApiAgg) {
      gridApiAgg.redrawRows();
    }
  }, [rowDataAgg, gridApiAgg]);

  const onBackPressed = () => {
    history.push("/dashboard");
  };

  const onFirstDataRendered = (event: FirstDataRenderedEvent) => {
    event.api.sizeColumnsToFit();
    setGridApi(event.api);
  };

  const onFirstDataRenderedAgg = (event: FirstDataRenderedEvent) => {
    event.api.sizeColumnsToFit();
    setGridApiAgg(event.api);
  };

  return (
    <div style={{ margin: 20 }}>
      <button onClick={onBackPressed}>Back</button>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 20,
          }}
        >
          <div>Your Activities</div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{
            height: 300,
            width: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <AgGridReact
            defaultColDef={{
              resizable: true,
              editable: false,
            }}
            rowSelection="single"
            rowData={rowData}
            columnDefs={columnDefs}
            onFirstDataRendered={onFirstDataRendered}
          ></AgGridReact>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 40,
          }}
        >
          <div>Total Owned Shares</div>
        </div>
        <div
          className="ag-theme-alpine"
          style={{
            height: 300,
            width: "auto",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <AgGridReact
            defaultColDef={{
              resizable: true,
              editable: false,
            }}
            rowSelection="single"
            rowData={rowDataAgg}
            columnDefs={columnDefsAgg}
            onFirstDataRendered={onFirstDataRenderedAgg}
          ></AgGridReact>
        </div>
      </div>
    </div>
  );
}
