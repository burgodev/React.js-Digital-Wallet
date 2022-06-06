import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const useNavigation = (navigation) => {
  const i18n = useTranslation().t;
  const [navList, setNavList] = useState([])

  const ACCOUNTS_NAV = useMemo(() => [
    {
      id: "demoAccount",
      text: i18n("navigation.demoAccount"),
      link: "/client/accounts/demo-account",
    },
    {
      id: "realAccount",
      text: i18n("navigation.realAccount"),
      link: "/client/accounts/real-account",
    },
    {
      id: "transferHistory",
      text: i18n("navigation.transferHistory"),
      link: "/client/accounts/transfer-history",
    },
  ], [i18n])


  const DEPOSIT_NAV = useMemo(() => [
    {
      id: "newDeposit",
      text: i18n("navigation.newDeposit"),
      link: "/client/deposit/new-deposit",
    },
    {
      id: "depositHistory",
      text: i18n("navigation.depositHistory"),
      link: "/client/deposit/history",
    },
  ], [i18n])


  const WITHDRAW_NAV = useMemo(() => [
    {
      id: "newWithdraw",
      text: i18n("navigation.newWithdraw"),
      link: "/client/withdraw/new-withdraw",
    },
    {
      id: "withdrawHistory",
      text: i18n("navigation.withdrawHistory"),
      link: "/client/withdraw/history",
    },
  ], [i18n])

  const PLATFORMS_NAV = useMemo(() => [
    {
      id: "platforms",
      text: i18n("navigation.platforms"),
      link: "/client/platforms",
    },
  ], [i18n])

  const PROFILE_NAV = useMemo(() => [
    {
      id: "changePassword",
      text: i18n("profile.changePassword"),
      link: "/client/profile/change-password",
    },
    {
      id: "profile",
      text: i18n("profile.myProfile"),
      link: "/client/profile/my-profile",
    },
    {
      id: "documents",
      text: i18n("profile.myDocuments"),
      link: "/client/profile/documents",
    },
  ], [i18n])

  useEffect(() => {
    switch (navigation.toUpperCase()) {
      case NAVIGATION_OPTIONS.ACCOUNTS: {
        setNavList(ACCOUNTS_NAV)
        break;
      }
      case NAVIGATION_OPTIONS.DEPOSIT: {
        setNavList(DEPOSIT_NAV)
        break;
      }
      case NAVIGATION_OPTIONS.WITHDRAW: {
        setNavList(WITHDRAW_NAV)
        break;
      }
      case NAVIGATION_OPTIONS.PLATFORMS: {
        setNavList(PLATFORMS_NAV)
        break;
      }
      case NAVIGATION_OPTIONS.PROFILE: {
        setNavList(PROFILE_NAV)
        break;
      }
      default: {
        setNavList([])
        break;
      }
    }

  }, [navigation, ACCOUNTS_NAV, DEPOSIT_NAV, WITHDRAW_NAV, PLATFORMS_NAV, PROFILE_NAV])

  return navList;
}

export default useNavigation;

export const NAVIGATION_OPTIONS = {
  ACCOUNTS: "ACCOUNTS",
  DEPOSIT: "DEPOSIT",
  WITHDRAW: "WITHDRAW",
  PLATFORMS: "PLATFORMS",
  PROFILE: "PROFILE",
}
