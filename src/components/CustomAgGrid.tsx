
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export function CustomAgGrid({ rowData, columnDefs } : any) {
  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 300, width: "auto", marginTop: 20, marginBottom: 20 }}
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
        sideBar={{
          toolPanels: ["columns", "filters"],
        }}
        rowSelection="single"
        rowData={rowData}
        columnDefs={columnDefs}
      ></AgGridReact>
    </div>
  );
}
