import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/SignUp";
import { Trade } from "./pages/Trade";
import { Transaction } from "./pages/Transaction";
import { CompanyDetails } from "./pages/CompanyDetails";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/(|login)/">
          <Login />
        </Route>
        <Route exact path="/sign-up">
          <SignUp />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/trade">
          <Trade />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/company">
          <CompanyDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
