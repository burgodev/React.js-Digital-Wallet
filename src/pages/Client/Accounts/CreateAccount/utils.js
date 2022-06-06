export const VIRTUAL_BALANCE_OPTIONS = [1000, 2000, 3000, 10000]
export const ACCOUNT_TYPE = {
    DEMO: "DEMO",
    REAL: "REAL"
}
export const ACCOUNT_CATEGORY = {
    METATRADER: "METATRADER",
    BOTMONEY: "BOTMONEY"
}

export const METATRADER_TYPE = {
    STANDARD: "STANDARD",
    RAW_SPREAD: "RAW_SPREAD",
}

export const initialValues = {
    name: "",
    category: "METATRADER",
    leverage: "",
    type: "",
    balance: "",
};

export const validate = (values, accountType) => {
    const errors = {};

    if (!values.name) {
        errors.name = "Campo obrigatório *";
        return errors;
    }
    if (!values.category) {
        errors.category = "Campo obrigatório *";
        return errors;
    }
    if (values.category === ACCOUNT_CATEGORY.METATRADER) {
        if (!values.type) {
            errors.type = "Campo obrigatório *";
            return errors;
        }
        if (!values.leverage) {
            errors.leverage = "Campo obrigatório *";
            return errors;
        }
        if (accountType === "demo" && !values.balance) {
            errors.balance = "Campo obrigatório *";
            return errors;
        }
    }

    return errors;
};
