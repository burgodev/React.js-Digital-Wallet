import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import AppWrapper from "./_common/components/AppWrapper";
// Client
import Login from "../src/pages/_common/Login";
import ConfirmEmail from "../src/pages/_common/ConfirmEmail";
import ErrorPage from "../src/pages/_common/ErrorPage";
import {
  PasswordReset,
  EmailVerification,
  ChangePassword,
} from "../src/pages/Client/PasswordReset";
// Register
import Register from "../src/pages/Client/Register";
import TermsOfUse from "./pages/Client/TermsOfUse";
import ProfileData from "./pages/Client/ProfileValidation/components/Steps/ProfileData";
import DocumentData from "./pages/Client/ProfileValidation/components/Steps/DocumentData";
import OverviewInformation from "./pages/Client/ProfileValidation/components/Steps/OverviewInformation";

//Accounts
import {
  RealAccount,
  DemoAccount,
  CreateAccount,
  TransferHistory
} from "./pages/Client/Accounts";
//Deposit
import {
  DepositHistory,
  NewDeposit,
} from "./pages/Client/Deposit";
//Withdraw
import {
  NewWithdraw,
  WithdrawHistory,
} from "./pages/Client/Withdraw";

import Dashboard from "./pages/Client/Dashboard";
import Platforms from "./pages/Client/Platforms";
import {
  ChangePasswordProfile,
  Documents,
  MyProfile,
} from "./pages/Client/Profile";

// Admin
import AdminHome from "./pages/Admin/Home";
import FundBalance from "./pages/Admin/FundBalance";
import AdminListUserValidation from "./pages/Admin/ListUserValidation";
import AdminUserInformation from "./pages/Admin/UserInformation";

// Support
import SupportListUserValidation from "./pages/Support/ListUserValidation";
import SupportUserInformation from "./pages/Support/UserInformation";


// Manager
import { BasicProfile, ComplementaryProfile, UploadDocuments } from "./pages/Manager/Register/index";
import { Clients, ManagersDash } from "./pages/Manager/Dashboard";
import NewManagers from "./pages/Admin/ValidationManagers";

// Admin - Users
import UserDashboard from "./pages/Admin/Users/UserDashboard";
import UserList from "./pages/Admin/Users/UserList";
import UserData from "./pages/Admin/Users/UserData";
import UserTransactions from "./pages/Admin/Users/UserTransactions";
import UserExtract from "./pages/Admin/Users/UserExtract";

// Admin - Bussiness
import ManagersAndClients from "./pages/Business/ManagersAndClients/ManagersAndClients"

import { RedirectHandler } from "./_common/components"


//SUPPORT 


export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* COMMON */}
        <Route path="/" exact component={Login} />
        <Route path="/auth/email-confirmation/:token" exact component={ConfirmEmail} />
        <Route path="/error-page" exact component={ErrorPage} />
        <Route path="/register/:manager_code?" exact component={Register} />
        <Route path="/terms-of-use" exact component={TermsOfUse} />
        <Route path="/password-recover" exact component={PasswordReset} />
        <Route
          path="/password-recover/email-verification"
          exact
          component={EmailVerification}
        />
        <Route path="/auth/confirm-email/:token" exact component={ConfirmEmail} />
        <Route
          path="/auth/password-recovery/:token"
          exact
          component={ChangePassword}
        />
        <Route path="/profile/validation/data" exact component={ProfileData} />
        <Route
          path="/profile/validation/documents"
          exact
          component={DocumentData}
        />
        <Route
          path="/profile/validation/review"
          exact
          component={OverviewInformation}
        />
        <Route path="/register_manager/:manager_code?" exact component={BasicProfile} />
        <Route
          path="/register_manager_complementary"
          exact
          component={ComplementaryProfile}
        />
        <Route
          path="/register_manager_upload"
          exact
          component={UploadDocuments}
        />
        <RedirectHandler>
          <AppWrapper>
            {/* CLIENT */}
            <Route path="/client/dashboard" exact component={Dashboard} />
            <Route path="/client/platforms" exact component={Platforms} />
            {/* CLIENT - PROFILE */}        
            <Route path="/client/profile/change-password" exact component={ChangePasswordProfile} />
            <Route path="/client/profile/my-profile" exact component={MyProfile} />
            <Route path="/client/profile/documents" exact component={Documents} />
            {/* CLIENT - ACCOUNTS */}
            <Route path="/client/accounts/real-account" exact component={RealAccount} />
            <Route path="/client/accounts/demo-account" exact component={DemoAccount} />
            <Route path="/client/accounts/create-account/:accountType" exact component={CreateAccount} />
            <Route path="/client/accounts/transfer-history" exact component={TransferHistory} />
            <Route path="/dashboard" exact component={Dashboard} />
            {/* CLIENT - WITHDRAWL */}
            <Route path="/client/withdraw/history" exact component={WithdrawHistory} />
            <Route path="/client/withdraw/new-withdraw" exact component={NewWithdraw} />
            {/* CLIENT - DEPOSIT */}
            <Route path="/client/deposit/history" exact component={DepositHistory} />
            <Route path="/client/deposit/new-deposit" exact component={NewDeposit} />

            {/* <Route path="/accounts" exact component={OperationAccount} /> */}

            {/* Business*/}
            <Route
              path="/business/managers-and-clients"
              exact
              component={ManagersAndClients}
            />

            {/* ADMIN */}
            <Route path="/admin/home" exact component={AdminHome} />
            <Route path="/admin/fund-balance" exact component={FundBalance} />

            <Route
              path="/admin/users/validation"
              exact
              component={AdminListUserValidation}
            />
            <Route
              path="/client/users/validation"
              exact
              component={AdminListUserValidation}
            />
            <Route
              path="/admin/users/validation_managers"
              exact
              component={NewManagers}
            />

            <Route path="/admin/users" exact component={UserList} />
            <Route path="/admin/users/user" exact component={UserDashboard} />
            <Route path="/admin/users/user/data" exact component={UserData} />
            <Route
              path="/admin/users/user/transactions"
              exact
              component={UserTransactions}
            />
            <Route
              path="/admin/users/user/extract"
              exact
              component={UserExtract}
            />

            <Route
              path="/admin/user/information"
              exact
              component={AdminUserInformation}
            />

            {/* Support */}
            <Route path="/support/users/validation" exact component={SupportListUserValidation} />
            <Route
              path="/support/user/information"
              exact
              component={SupportUserInformation}
            />

            {/* Manager */}
            <Route path="/manager/home/clients" exact component={Clients} />
            <Route path="/manager/home/managers" exact component={ManagersDash} />

            <Route
              path="/manager/users"
              exact
              component={AdminListUserValidation}
            />
          </AppWrapper >
        </RedirectHandler>
      </Switch >
    </BrowserRouter >
  );
}
