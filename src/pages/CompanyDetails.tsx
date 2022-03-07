/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { useHistory } from "react-router-dom";
import {
  getCurrentCompany,
  getCurrentCompanyName,
  isUserLoggedIn,
  saveCurrentCompany,
} from "../utils/UserUtils";

import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";

export function CompanyDetails() {
  const history = useHistory();
  const [rowData, setRowData] = useState<any>([]);

  const [columnDefs] = useState([
    { field: "date", headerName: "Tweeted Date" },
    { field: "screenName", headerName: "Twitter Username" },
    { field: "content", headerName: "Tweet Content" },
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
      const requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      };
      fetch(
        `http://localhost:9191/v1/company/get-tweets/${
          (currCompany as any).shortName
        }`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => setRowData(data));
    }
  }, []);

  const onBackPressed = () => {
    saveCurrentCompany(null);
    history.push("/trade");
  };

  return (
    <div style={{ margin: 20 }}>
      <button onClick={onBackPressed}>Back</button>
      <div style={{ marginTop: 20 }}>Recent Tweets on {getCurrentCompanyName()}</div>
      <div
          className="ag-theme-alpine"
          style={{ height: 500, width: "auto", marginTop: 20, marginBottom: 20 }}
        >
          <AgGridReact
            defaultColDef={{
              resizable: true,
              editable: false,
            }}
            rowSelection="single"
            rowData={rowData}
            columnDefs={columnDefs}
          ></AgGridReact>
        </div>
    </div>
  );
}
