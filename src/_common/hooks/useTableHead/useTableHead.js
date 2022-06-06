import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

const useTableHead = (table) => {
  const i18n = useTranslation().t;
  const [tableHead, setTableHead] = useState([])

  const DEPOSIT_HISTORY_TABLE = useMemo(() => [
    {
      text: i18n("table.solicitationDate"),
      ordenation:true,
      id: 1,
    },
    {
      text: i18n("table.walletAddress"),           
      id: 2,
    },
    {
      text: i18n("table.currency"),                 
      id: 3,
    },
    {  
      text: i18n("table.tax"),   
      id: 4,
    },
    {
      text: i18n("table.value"),         
      id: 5,
    },
  ], [i18n])


  const TRANSACTION_HISTORY_TABLE = useMemo(() => [
    {
      text: i18n("table.solicitationDate"),
      ordenation:true,
      id: 1,
    },
    {
      text: i18n("table.walletAddress"),           
      id: 2,
    },
    {
      text: i18n("table.destiny"),
      id:3
    },
    {
      text: i18n("table.currency"),                 
      id: 4,
    },
    {
      text: i18n("table.value"),         
      id: 5,
    },
  ], [i18n])

  useEffect(() => {
    switch (table.toUpperCase()) {
      case TABLEHEAD_OPTIONS.DEPOSIT_HISTORY: {
        setTableHead(DEPOSIT_HISTORY_TABLE)
        break;
      }
      case TABLEHEAD_OPTIONS.TRANSACTION_HISTORY: {
        setTableHead(TRANSACTION_HISTORY_TABLE)
        break;
      }
      default: {
        setTableHead([])
        break;
      }
    }

  }, [table, DEPOSIT_HISTORY_TABLE,TRANSACTION_HISTORY_TABLE])


  return tableHead;
}

export default useTableHead;

export const TABLEHEAD_OPTIONS = {
  DEPOSIT_HISTORY: "DEPOSIT_HISTORY",
  TRANSACTION_HISTORY: "TRANSACTION_HISTORY"
}
