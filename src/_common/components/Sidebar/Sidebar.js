import React, { useEffect, useState } from "react";
import { withStyles, List } from "@material-ui/core";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { useTranslation } from "react-i18next";

import { Flex, Typography, Divider, Container, Logout } from "../";
import selectLogoBackground from "../../../assets/images/selectLogoBackground.png";
import wallet from "../../../assets/images/wallet.jpg";
import { ListItem, useSidebarNavigation } from "./utils"
import socket from "../../../services/socket";
import api from '../../../services/api';
import { formatCurrency } from "../../utils/functions"

const Sidebar = ({ classes, onClose = x => x, }) => {
    const i18n = useTranslation().t;
    const location = useLocation();
    const role = localStorage.getItem("role");
    const navigation = useSidebarNavigation(role);
    const [selected, setSelected] = useState();
    const [balance, setBalance] = useState(0);
    const [showBalance, setShowBalance] = useState(true);
    const [items, setItems] = useState([]);
    const handleListItemClick = (event, index) => {
        setSelected(index);
        onClose()
    };

    useEffect(() => {
        setItems(navigation)
    }, [navigation, onClose])




    const getCode = async () => {
        try {
            const { data } = await api.get("/client/wallet/balance")
            setBalance(data.payload.balance)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCode()
    }, [])

    useEffect(() => {
        socket?.on("walletBalanceChanged", data => {
            setBalance(data.balance);
        });

        const url = location.pathname.split("/")[2]
        setSelected(url)
    }, [role, location])

    return (
        <Container className={classes.container}>
            <Flex center>
                <img src={selectLogoBackground} alt="select logo" className={classes.selectLogo} />
            </Flex>
            <Flex className={classes.flex}>
                <img src={wallet} alt="carteira" className={classes.wallet} />
                <Typography>
                    {i18n("sidebar.wallet")}
                </Typography>
                <Typography margin="10px 0 0px" fontSize={12}>
                    {i18n("sidebar.availableBalance")}:
                </Typography>
                <Flex justifyContent="space-between">
                    {showBalance ?
                        <>
                            <Typography fontSize={20} >
                                {formatCurrency(balance) || 0}
                            </Typography>
                            <VisibilityOffIcon onClick={() => setShowBalance(!showBalance)} className={classes.icon} />
                        </>
                        :
                        <>
                            <Typography fontSize={20} >
                                $ ***
                            </Typography>
                            <VisibilityIcon onClick={() => setShowBalance(!showBalance)} className={classes.icon} />
                        </>
                    }






                </Flex>
            </Flex>
            <Divider className={classes.divider} />
            <Flex className={classes.flexLinks}>
                <List component="nav" className={classes.list}>
                    {items.map(({ id, text, url, icon }) => (
                        <Typography
                            element="a"
                            key={id}
                            url={url}
                            className={classes.mainLink}
                        >
                            <ListItem
                                button
                                className={classes.listItemText}
                                selected={id === selected}
                                onClick={(event) => handleListItemClick(event, id)}
                            >
                                {selected === id && (
                                    <Divider
                                        className={classes.dividerActiveLink}
                                        orientation="vertical"
                                    />
                                )}
                                {icon}
                                <Typography className={classes.typography}>
                                    {text}
                                </Typography>
                            </ListItem>
                        </Typography>
                    ))}

                </List>
            </Flex>
            <Flex center className={classes.flexFaq}>
                <Logout />
                {/* <Typography className={classes.faqDescription}>                    
                    {i18n("sidebar.doubts")}
                    <Typography element="a" fontWeight="600" margin="3px 0 0 0">
                    {i18n("sidebar.faq")}                        
                    </Typography>
                </Typography> */}
            </Flex>
        </Container>
    );
}

Sidebar.propTypes = {
    classes: PropTypes.object,
};

export default withStyles((theme) => ({
    list: {
        width: "100%",
        maxWidth: "360px",
    },
    selectLogo: {
        // width: "100%",
    },
    flexLinks: {
        justifyContent: "space-between",
        flexDirection: "column",
        height: "45%",
        [theme.breakpoints.only("lg")]: {
            height: "50%",
        },
    },
    flexFaq: {
        marginLeft: 12,
        // flexDirection: "column",
        // height: "20%",
        // [theme.breakpoints.only("lg")]: {
        //     height: "10%",
        // },
    },
    container: {
        zIndex: 1,
        position: "fixed",
        flexDirection: "column",
        display: "flex",
        height: "100vh",
        width: "325px",
        left: 0,
        top: 0,
        background: theme.palette.secondary.main,
        color: theme.palette.white,
        borderBottomRightRadius: "30px",
        borderTopRightRadius: "30px",        
        justifyContent: "space-between",
        padding: "25px 0",
        [theme.breakpoints.down("lg")]: {
            width: "280px",
        },
    },
    listItemText: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "50px",
        marginLeft: "12px",
    },
    activeLink: {
        background: "#e8fafa",
        color: "white",
    },
    listItem: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        color: "#151a30",
        paddingLeft: "60px",
        "&.active": {
            background: "black",
        },
    },
    mainLink: {
        display: "flex",
        alignItems: "center",
        color: "inherit",
        // color: theme.palette.white,
        opacity: "0.95",
        fontSize: "1rem",
        fontWeight: 500,

        "&.active": {
            background: "black",
        },
        [theme.breakpoints.only("lg")]: {
            fontSize: "0.90rem",
        },
    },
    dividerActiveLink: {
        position: "absolute",
        right: "0px",
        width: "7px",
        background: "#151A30",
        animation: "animatetop 0.3s",
        opacity: 1,
        border: "none",
        height: "50%"
    },

    faqDescription: {
        display: "flex",
        flexDirection: "column",
        background: theme.palette.main,
        color: "white",
        padding: "20px 5px",
        width: "80%",
        borderRadius: "10px",
        fontWeight: 300,
        fontSize: "0.8rem",
        [theme.breakpoints.only("lg")]: {
            padding: "10px 5px",
            width: "80%",
            fontSize: "0.7rem",
            bottom: "10px",
        },
    },
    divider: {
        opacity: 1,
        color: "white",
        width: "95%",
        margin: "0 auto"
    },
    wallet: {
        width: 50,
        marginBottom: 4
    },
    flex: {
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "0 24px"
    },
    icon: {
        margin: "auto 16px",
        cursor: "pointer"
    },
    typography: {
        marginLeft: 8
    }
}))(Sidebar);


