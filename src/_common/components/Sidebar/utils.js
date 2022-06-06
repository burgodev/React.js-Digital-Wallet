import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
// import ReceiptIcon from '@material-ui/icons/Receipt';
import PersonIcon from '@material-ui/icons/Person';
import DesktopMacIcon from '@material-ui/icons/DesktopMac';
import AddBoxIcon from '@material-ui/icons/AddBox';
// import PrintIcon from '@material-ui/icons/Print';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { withStyles, ListItem as MuiListItem } from "@material-ui/core";
import { ROLES } from "../../../_common/utils/constants"
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { theme } from "../../utils/theme";

export const useSidebarNavigation = (role = ROLES.CLIENT) => {
  const i18n = useTranslation().t;
  const [navigation, setNavigation] = useState([])
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const CLIENT_NAV = useMemo(() => [
    // {
    //   id: "dashboard",
    //   text: i18n("sidebar.home"),
    //   url: "/client/dashboard",
    //   icon: <HomeIcon style={{fontSize: 22}} />
    // },
    {
      id: "accounts",
      text: i18n("sidebar.accounts"),
      url: "/client/accounts/real-account",
      icon: <AccountBalanceIcon style={{ fontSize: 22 }} />
    },
    {
      id: "deposit",
      text: i18n("sidebar.deposit"),
      url: "/client/deposit/new-deposit",
      icon: <AddBoxIcon style={{ fontSize: 22 }} />
    },
    {
      id: "withdraw",
      text: i18n("sidebar.withdraw"),
      url: "/client/withdraw/new-withdraw",
      icon: <AttachMoneyIcon style={{ fontSize: 22 }} />
    },
    // {
    //   id: "extract",
    //   text: i18n("sidebar.extract"),
    //   url: "/client/extract",
    //   icon: <ReceiptIcon style={{fontSize: 22}} />
    // },
    // {
    //   id: "report",
    //   text: i18n("sidebar.report"),
    //   url: "/client/report",
    //   icon: <PrintIcon style={{fontSize: 22}} />
    // },
    {
      id: "platforms",
      text: i18n("sidebar.platforms"),
      url: "/client/platforms",
      icon: <DesktopMacIcon style={{ fontSize: 22 }} />
    },
  ], [i18n]);

  const ADMIN_NAV = useMemo(() => [
    {
      id: "dashboard",
      text: "Início",
      url: "/admin/home",
      icon: <HomeIcon style={{ fontSize: 22 }} />
    },
    {
      id: "userValidation",
      text: "Validação de Usuários",
      url: "/admin/users/validation",
      icon: <PersonIcon style={{ fontSize: 22 }} />
    },
    {
      id: "managerValidation",
      text: "Validação de Gestores",
      url: "/admin/users/validation_managers",
      icon: <SupervisorAccountIcon style={{ fontSize: 22 }} />
    },
    {
      id: "fundBalance",
      text: "Controle de saldo",
      url: "/admin/fund-balance",
      icon: <AttachMoneyIcon style={{ fontSize: 22 }} />
    },
  ], []);

  const SUPPORT_NAV = useMemo(() => [
    {
      id: "dashboard",
      text: "Validação de Usuários",
      url: "/support/users/validation",
      icon: <HomeIcon style={{ fontSize: 22 }} />
    }
  ], []);

  const BUSINESS_NAV = useMemo(() => [
    {
      id: "dashboard",
      text: "Início",
      url: "/business/home",
      icon: <HomeIcon style={{ fontSize: 22 }} />
    },
    {
      id: "dashboard",
      text: "Clientes e Gestores",
      url: "/business/managers-and-clients",
      icon: <HomeIcon style={{ fontSize: 22 }} />
    },
  ], []);

  const MANAGER_NAV = useMemo(() => [
    {
      id: "dashboard",
      text: "Meus usuários",
      url: "/manager/home/clients",
      icon: <HomeIcon style={{ fontSize: 22 }} />
    },
  ], []);


  useEffect(() => {
    switch (role.toUpperCase()) {
      case ROLES.ADMIN: {
        setNavigation(ADMIN_NAV)
        break;
      }
      case ROLES.MANAGER: {
        setNavigation(MANAGER_NAV)
        break;
      }
      case ROLES.SUPPORT: {
        setNavigation(SUPPORT_NAV)
        break;
      }
      case ROLES.BUSINESS: {
        setNavigation(BUSINESS_NAV)
        break;
      }
      default: {
        if (mobile)
          setNavigation([...CLIENT_NAV,
          {

            id: "profile",
            text: "Perfil",
            url: "/client/profile/my-profile",
            icon: <PersonIcon style={{ fontSize: 22 }} />

          }])
        else
          setNavigation(CLIENT_NAV)
        break;
      }
    }

  }, [ADMIN_NAV, MANAGER_NAV, SUPPORT_NAV, BUSINESS_NAV, CLIENT_NAV, role, mobile])

  return navigation;
}

export const ListItem = withStyles({
  root: {
    "&$selected": {
      backgroundColor: "white",
      color: "#151A30",
    },
    "&$selected:hover": {
      backgroundColor: "white",
      color: "#151A30",
      "& .MuiListItemIcon-root": {
        color: "#151A30",
      },
    },
    "&:hover": {
      backgroundColor: "white",
      color: "#151A30",
      "& .MuiListItemIcon-root": {
        color: "#151A30",
      },
    },
  },
  selected: {},
})(MuiListItem);