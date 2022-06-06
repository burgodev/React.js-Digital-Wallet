import React, { useEffect, useState } from "react";
import { Avatar, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { Flex, Typography, Container, Divider, SelectLanguage, Notifications, Token } from "../";
import api from "../../../services/api";

const Header = ({ classes }) => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const [firstName, setFirstName] = useState("");
    const [profileImageRoute, setProfileImageRoute] = useState("");

    useEffect(() => {
        const getUserInformation = async () => {
            try {
                const { data } = await api.get("user/profile");
                setFirstName(data.payload.first_name);
                setProfileImageRoute(data.payload.route_img);
            } catch (error) { }
        };

        getUserInformation();
    }, [email]);

    return (
        <Container className={classes.container}>
            <Link to="/client/profile/my-profile" className={classes.link}>
                <Avatar
                    variant="rounded"
                    src={profileImageRoute}
                    className={classes.avatar}
                />
                <Flex className={classes.flex}>
                    <Typography className={classes.name}>
                        {firstName || "Usuário"}
                    </Typography>
                    <Divider />
                    <Typography className={classes.email}>{email}</Typography>
                </Flex>
            </Link>
            <Flex center justifyContent="flex-end">
                <Typography className={classes.warning}>ACESSO DE TESTES</Typography>
            </Flex>
            <Flex justifyContent="flex-end" alignItems="center">
                {role !== "admin" && <Token />}
                <Notifications />
                <SelectLanguage />
            </Flex>
        </Container>
    );
};

export default withStyles((theme) => ({
    container: {
        alignItems: "center",
        justifyContent: "space-between",
        display: "flex",
        position: "fixed",
        right: 0,
        top: 0,
        borderRadius: "10px",
        background: "white",
        padding: "8px 24px",
        height: "10vh",
        width: "calc(100vw - 325px)",
        [theme.breakpoints.down("lg")]: {
            height: "12vh",
            width: "calc(100vw - 280px)",
        },
    },
    avatar: {
        width: theme.spacing(6),
        height: theme.spacing(6),
        background: theme.palette.main,
        boxShadow: "inset 4px 4px 10px rgba(0, 0, 0, 0.25)",
        borderRadius: "50%",
        marginRight: "15px",
        [theme.breakpoints.down("lg")]: {
            width: 36,
            height: 36
        },
    },
    name: {
        fontWeight: 600,
        fontSize: "18px",
        color: theme.colors.text,
        textAlign: "left",
        width: "100%",
        [theme.breakpoints.down("lg")]: {
            fontSize: "1rem",
        },
    },
    email: {
        marginTop: 4,
        fontSize: "0.75rem",
        fontWeight: 500,
        color: theme.colors.text,
        textAlign: "left",
    },
    link: {
        display: "flex",
        alignItems: "center",
        textDecoration: "none"
    },
    flex: {
        flexDirection: "column",
        width: "22%",
        position: "relative",
        marginRight: "120px"
    },
    warning: {
        fontSize: 32,
        color: theme.palette.error.main
    }
}))(Header);

Header.propTypes = {
    classes: PropTypes.object,
};
