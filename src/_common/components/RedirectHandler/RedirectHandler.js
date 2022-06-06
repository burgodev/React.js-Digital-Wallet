import React from "react";
import PropTypes from "prop-types";
import { Redirect, useLocation } from "react-router-dom";

const RedirectHandler = ({ children }) => {
    const location = useLocation();
    const role = localStorage.getItem("role")
    const url = location.pathname.split("/")[1]

    if (url.toUpperCase() !== role.toUpperCase()) {
        return <Redirect to={"/error-page"} />;
    }

    return <>{children}</>;
};

RedirectHandler.propTypes = {
    children: PropTypes.object,
};

export default RedirectHandler;

