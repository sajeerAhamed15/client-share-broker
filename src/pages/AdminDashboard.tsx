import { Button, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { Add, AttachMoney, Business, ArrowBack } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {
  createCompany,
  createCurrency,
  getAllCompany,
  getAllCurrency,
  getAllUser,
  updateExchangeRate,
  updateSharePrice,
} from "../api/AdminApi";
import { AddCompanyDialog } from "../components/AddCompanyDialog";
import { AddCurrencyDialog } from "../components/AddCurrencyDialog";
import { CustomAgGrid } from "../components/CustomAgGrid";

export function AdminDashboard() {
  const history = useHistory();
  const [rowDataCurrency, setRowDataCurrency] = useState([]);
  const [rowDataCompany, setRowDataCompany] = useState([]);
  const [rowDataUser, setRowDataUser] = useState([]);
  const [openDialogCompany, setOpenDialogCompany] = useState(false);
  const [openDialogCurrency, setOpenDialogCurrency] = useState(false);

  const [columnDefsCompany] = useState([
    { field: "id" },
    { field: "name" },
    { field: "shortName" },
    { field: "totalShares" },
    { field: "currency" },
    { field: "pricePerShare" },
    { field: "currency" },
    { field: "updatedDate" },
  ]);

  const [columnDefsCurrency] = useState([
    { field: "id" },
    { field: "name" },
    { field: "code" },
    { field: "rateInUsd" },
    { field: "updatedDate" },
  ]);

  const [columnDefsUser] = useState([{ field: "id" }, { field: "name" }]);

  useEffect(() => {
    refreshPage();
  }, []);

  const refreshPage = async () => {
    const companyData = await getAllCompany();
    const currencyData = await getAllCurrency();
    const userData = await getAllUser();

    setRowDataCompany(companyData);
    setRowDataCurrency(currencyData);
    setRowDataUser(userData);
  };

  const handleAddCompanyClicked = () => {
    setOpenDialogCompany(true);
  };

  const handleAddCurrencyClicked = () => {
    setOpenDialogCurrency(true);
  };

  const handleAddCompany = async (value: any) => {
    await createCompany(value);
    refreshPage();
  };

  const handleAddCurrency = async (value: any) => {
    await createCurrency(value);
    refreshPage();
  };

  const handleRefreshExchangeRate = async () => {
    await updateExchangeRate();
    refreshPage();
  };

  const handleRefreshSharePrice = async () => {
    await updateSharePrice();
    refreshPage();
  };

  return (
    <div style={{ margin: 20 }}>
      <AddCompanyDialog
        open={openDialogCompany}
        handleClose={() => setOpenDialogCompany(false)}
        add={handleAddCompany}
      />
      <AddCurrencyDialog
        open={openDialogCurrency}
        handleClose={() => setOpenDialogCurrency(false)}
        add={handleAddCurrency}
      />
      <Button
        style={{ fontSize: 8 }}
        variant="outlined"
        color="primary"
        onClick={() => history.push("/login")}
        startIcon={<ArrowBack />}
      >
        Back to Login Page
      </Button>
      <h1>Admin Portal</h1>
      <Grid container>
        <Button
          style={{ margin: 8 }}
          variant="outlined"
          color="primary"
          onClick={handleAddCompanyClicked}
          endIcon={<Add />}
        >
          Add New Company
        </Button>
        <Button
          style={{ margin: 8 }}
          variant="outlined"
          color="primary"
          onClick={handleAddCurrencyClicked}
          endIcon={<Add />}
        >
          Add New Currency
        </Button>
        <Button
          style={{ margin: 8 }}
          variant="outlined"
          color="primary"
          onClick={handleRefreshExchangeRate}
          endIcon={<AttachMoney />}
        >
          Refresh Exchange Rate
        </Button>
        <Button
          style={{ margin: 8 }}
          variant="outlined"
          color="primary"
          onClick={handleRefreshSharePrice}
          endIcon={<Business />}
        >
          Refresh Share Price
        </Button>
        <Grid item xs={12}>
          <h2>Company Data</h2>
          <CustomAgGrid
            rowData={rowDataCompany}
            columnDefs={columnDefsCompany}
          />
          <h2>Currency Data</h2>
          <CustomAgGrid
            rowData={rowDataCurrency}
            columnDefs={columnDefsCurrency}
          />
          <h2>User Data</h2>
          <CustomAgGrid rowData={rowDataUser} columnDefs={columnDefsUser} />
        </Grid>
      </Grid>
    </div>
  );
}
