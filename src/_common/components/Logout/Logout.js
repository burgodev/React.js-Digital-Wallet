import React from "react";
import { withStyles, ListItem as MuiListItem } from "@material-ui/core";
import { theme } from "../../utils/theme";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Typography } from "../";

const Logout = ({ classes, ...props }) => {
    const i18n = useTranslation().t;
    const history = useHistory();
    const logout = () => {
        localStorage.removeItem("token");
        history.push("/");
    };
    return (
        <ListItem button className={classes.listItemText} onClick={logout} {...props}>
            <ExitToAppIcon className={classes.icon} color="inherit" />
            <Typography>{i18n("sidebar.logout")}</Typography>
        </ListItem>
    );
};

export default withStyles((theme) => ({
    icon: {
        fontSize: 24,
        marginRight: 8
    },
    listItemText: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "50px",
        marginLeft: "12px",
        color: "white",
        "&:hover": {
            background: "#e8fafa",
        },
    },
}))(Logout);


const ListItem = withStyles({
    root: {
        [theme.breakpoints.only("md")]: {
            width: "100%",
            justifyContent: "center",
        },
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