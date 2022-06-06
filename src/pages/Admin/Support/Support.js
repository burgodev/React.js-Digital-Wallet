import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Typography, Flex } from "../../../_common/components";
import Modal from "@material-ui/core/Modal";
import { Avatar, Divider, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { theme } from "../../../_common/utils/theme";
import { useForm } from "react-hook-form";
import { FiUpload, FiImage, FiSearch, FiXCircle } from "react-icons/fi";
import Pagination from "@material-ui/lab/Pagination";
import { uploadFile } from "react-s3";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import api from "../../../services/api";
import "react-datepicker/dist/react-datepicker.css";

function Support({ classes }) {
  const id = localStorage.getItem("id");
  const [profileImgRoute, setProfileImgRoute] = useState(""); 
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [allTickets, setAllTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [messagesByTicket, setMessagesByTicket] = useState([]);
  const [filterAllStatus, setFilterAllStatus] = useState([]);
  const [ticketId, setTicketId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState("");

  const [statusFilter, setStatusFilter] = useState(0);
  const [filterSearchSupporter, setFilterSearchSupporter] = useState("");
  const [filterSearchSubject, setFilterSearchSubject] = useState("");

  const [ticketDateOpen, setTicketDateOpen] = useState("");
  const [ticketUpdatedDate, setTicketUpdatedDate] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketSupporter, setTicketSupporter] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [textNewMessage, setTextNewMessage] = useState("");
  const [ticketFiles, setTicketFiles] = useState("");
  const [imagesMessage, setImagesMessage] = useState("");

  const { register, handleSubmit, errors } = useForm({});  

  const config = {
    bucketName: "atom-storage",
    dirName: `ticket/user/${id}`,
    region: "sa-east-1",
    accessKeyId: "",
    secretAccessKey: "",
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const tableHead = [
    {
      name: t("ticketPage.tb_head_data"),
      id: 1,
    },
    {
        name: "Usuário",
        id: 2,
      },
    {
      name: t("ticketPage.tb_head_subject"),
      id: 3,
    },
    {
      name: t("ticketPage.tb_head_status"),
      id: 4,
    },
    {
      name: t("ticketPage.tb_head_ticketN"),
      id: 5,
    },
    {
      name: t("ticketPage.tb_head_supporter"),
      id: 6,
    },
  ];

  const handleChange = (e, value) => {
    setPage(value);
    setCurrentPage(value);
  };

  useEffect(() => {
    api.get("user/profile", {
      headers: {
        id: id
      }
    }).
    then((res) => {
      setProfileImgRoute(res.data.imageRoute);
    })
  },[id])

  useEffect(() => {
    api
      .get("support/ticketall", {
        headers: {
          userID: id,
        },
        params: {
          page: currentPage,
          amountItens: 10,
          statusID: statusFilter,
          adminName: filterSearchSupporter,
          subject: filterSearchSubject
        },
      })
      .then((res) => {
        setAllTickets(res.data.tickets);
        setTotalPages(res.data.totalPages);
      });
  }, [id, statusFilter, filterSearchSupporter, filterSearchSubject]);

  useEffect(() => {    
    api
      .get("support/ticket", {
        headers: {
          id: ticketId,
          userID: id,
        },
      })
      .then((res) => {
        setTicketDetails(res.data.files);
      });
    
  }, [ticketId, id]);

  useEffect(() => {
    api
      .get("support/messages", {
        headers: {
          ticketID: ticketId,
        },
      })
      .then((res) => {
        setMessagesByTicket(res.data);      
      });
  }, [ticketId]);

  useEffect(() => {
    api
      .get("support/getstatus")
      .then((res) => {
        setFilterAllStatus(res.data);      
      });
  }, []);

  const handleNewMessage = (e) => {
    const data = {
      text: textNewMessage,
      files: imagesMessage !== "" ? imagesMessage : [],
      userID: id,
      ticketId: ticketId,
    };
    try {
      api.post("support/newmessage", data);
      console.log("Data1"+data); 
      setTextNewMessage("");  
            
    } catch (err) {
      alert("erro ao enviar mensagem");      
      console.log("Data2"+data);
    }
  };

  const uploadImages = (e) => {
    setImagesMessage(e.target.files);
    let files = {};
    let routes = [];
    files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      uploadFile(files[i], config).then((data) => {
        routes.push(data.location);
        setImagesMessage(routes);
      });
    }
  };

  const handleOpenModal = (ticket) => {
    setTicketId(ticket.id);
    setTicketDateOpen(ticket.dateOpen);
    setTicketStatus(ticket.status);
    setTicketUpdatedDate(ticket.dateUpdate)
    setTicketSupporter(ticket.admin);
    setTicketSubject(ticket.subject);
    setTicketFiles(ticket.files);
    handleOpen();
  }

  return (
    <Flex flexDirection="column">
      <Modal open={open} onClose={handleClose}>
        
        <Flex
          className={classes.modalInfoTicket}
          flexDirection="row"
          width="70%"
        >
          <FiXCircle
              size={21}
              color="#6FACCF"
              onClick={handleClose}
              className={classes.iconCloseModal}
            />
          <Flex flexDirection="column" width="27%">
            <Typography
              textAlign="left"
              fontWeight={600}
              color={theme.colors.text}
              className={ticketStatus === "Finalizado" ? 
              classes.ticketStatusModalGreen :
              classes.ticketStatusModalYellow
            }              
            >
              {ticketStatus}
            </Typography>
            <Typography
              textAlign="left"
              color={theme.colors.textPurple}
              fontSize="1.6rem"
              fontWeight={700}
              className={classes.ticketTitle}
            >
              #{ticketId}
            </Typography>

            <Flex
              flexDirection="column"
              className={classes.ticketInfoContainer}
            >
              <Typography
                fontWeight={500}
                textAlign="left"
                fontSize="1.1rem"
                color={theme.colors.textPurple}
                margin="0 0 5px 0"
              >
                Data de abertura
              </Typography>
              <Typography fontWeight={500} textAlign="left" fontSize="1rem">
                {`${ticketDateOpen.substr(0, 10)}  ${ticketDateOpen.substr(
                  11,
                  5
                )} `}
              </Typography>
            </Flex>
            <Flex
              flexDirection="column"
              className={classes.ticketInfoContainer}
            >
              <Typography
                fontWeight={500}
                textAlign="left"
                fontSize="1.1rem"
                color={theme.colors.textPurple}
                margin="0 0 5px 0"
              >
                Ultima atualização
              </Typography>
              <Typography fontWeight={500} textAlign="left" fontSize="1rem">
              {`${ticketUpdatedDate.substr(0, 10)}  ${ticketUpdatedDate.substr(
                  11,
                  5
                )} `}
              </Typography>
            </Flex>
            <Flex
              flexDirection="column"
              className={classes.ticketInfoContainer}
            >
              <Typography
                fontWeight={500}
                textAlign="left"
                fontSize="1.1rem"
                color={theme.colors.textPurple}
                margin="0 0 5px 0"
              >
                Atendente
              </Typography>
              <Typography fontWeight={500} textAlign="left" fontSize="1rem">
                {ticketSupporter}
              </Typography>
            </Flex>
            <Flex
              flexDirection="column"
              className={classes.ticketInfoContainer}
            >
              <Typography
                fontWeight={500}
                textAlign="left"
                fontSize="1.1rem"
                color={theme.colors.textPurple}
                margin="0 0 5px 0"
              >
                Assunto
              </Typography>
              <Typography fontWeight={500} textAlign="left" fontSize="1rem">
                {ticketSubject}
              </Typography>
            </Flex>
            <Flex
              flexDirection="column"
              className={classes.ticketInfoContainer}
            >
              <Typography
                fontWeight={500}
                textAlign="left"
                fontSize="1.1rem"
                color={theme.colors.textPurple}
                margin="0 0 5px 0"
              >
                Anexos
              </Typography>

              <Flex style={{ flexWrap: "wrap"}}>
                {ticketDetails.map((ticketFile) => (
                  <Avatar
                    alt=""
                    src={ticketFile}
                    variant="square"
                    key={ticketFile}
                    className={classes.smallTicketImages}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
          <Divider className={classes.divider} orientation="vertical" />
          <Flex flexDirection="column">
            <Flex flexDirection="column" className={classes.areaMessage}>
              {messagesByTicket.map((messages) => (
                <Flex
                  width="80%"
                  flexDirection="column"
                  className={classes.positionRelative}
                >
                  <Typography
                    textAlign="justify" 
                    key={messages.message}                   
                    className={
                      messages.userID === parseInt(id) 
                      ? 
                      classes.userBoxText 
                      :                        
                      classes.supBoxText                      
                    }
                  >
                    {messages.message}
                    
                    
                    <Flex flexDirection="row">
                      {messages.files.map((imgs) => (
                        
                        <Typography
                        key={imgs}
                        margin={`${imgs ? "20px 20px 0 0" : ""}`}
                          style={{
                            
                            alignItems: "center",                            
                          }}
                          element="a"
                          url={imgs}
                        >
                          
                          {imgs !== "" ? (
                            
                            <Typography>                              
                              <FiImage />
                              Anexo
                            </Typography>
                          ) : (
                            <Typography>                                                           
                            </Typography>
                          )}
                        </Typography>
                      ))}
                    </Flex>
                  </Typography>
                  <Typography
                  textAlign={`${messages.userID === parseInt(id) ? 'left' : 'right'}`}
                  style={{ margin: "0 0 35px 0" }}
                  color="gray"
                  >
                    {`${messages.data.substr(0, 10)}  ${messages.data.substr(
                      11,
                      5
                    )} `}
                  </Typography>
                  <Avatar alt="" src={messages.userID === parseInt(id) ? profileImgRoute : ""} 
                  className={
                    messages.userID === parseInt(id) 
                    ?                     
                     classes.avatarUser
                     :
                     classes.avatarSupport 
                  } 
                  />
                </Flex>
              ))}
            </Flex>

            <form onSubmit={handleSubmit(handleNewMessage)}>
              <Flex flexDirection="column" style={{ position: "relative" }}>
                <textarea
                  value={textNewMessage}
                  onChange={(e) => setTextNewMessage(e.target.value)}
                  placeholder="Escreva sua resposta"
                  className={classes.textAreaMessage}
                />

                <Flex justifyContent="flex-end">
                  <Flex style={{ margin: "8px 0 0 0" }}>
                    <label className="label">
                      <input type="file"
                        name="imagesMessage"
                        onChange={uploadImages}
                        multiple
                      />
                      <FiUpload size={30} color="#91CDF2" />

                      <Flex alignItems="center">
                        <Typography textAlign="right" fontSize="0.80rem">
                          {t("ticketPage.modal_lb_file")}
                        </Typography>
                      </Flex>
                    </label>
                  </Flex>
                  <Button
                    type="submit"
                    style={{
                      background: theme.colors.textPurple,
                      textTransform: "unset",
                    }}
                  >
                    Enviar resposta
                  </Button>
                </Flex>
              </Flex>
            </form>
          </Flex>
        </Flex>
      </Modal>
    <Typography textAlign="left" className={classes.titlePageSupport}>Suporte</Typography>
      <Flex width="90%">
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            {t("ticketPage.sl_filter_data")}
          </Typography>
          <input
            id="dateFilter"
            className={classes.inputStyle}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            {t("ticketPage.tb_head_status")}
          </Typography>
          <select
            className={classes.inputStyle} 
            onChange={(e) => setStatusFilter(e.target.value)}           
          >
            <option value={0}>Selecione uma opção</option>
            {filterAllStatus.map((status) => (              
              <option key={status.id} value={status.id}>{status.name}</option>
            ))}
            

          </select>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            {t("ticketPage.tb_head_supporter")}
          </Typography>
          <Flex className={classes.positionRelative}>
            <input
              placeholder={t("ticketPage.ph_search")}
              className={classes.inputSearch}
              value={filterSearchSupporter}
              onChange={(e) => setFilterSearchSupporter(e.target.value)}
            />

            <FiSearch
              className={classes.iconSearch}
              size={20}
              strokeWidth="2px"
              color="gray"
            ></FiSearch>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            {t("ticketPage.tb_head_subject")}
          </Typography>
          <Flex className={classes.positionRelative}>
            <input
              placeholder={t("ticketPage.ph_search")}
              className={classes.inputSearch}
              value={filterSearchSubject}
              onChange={(e) => setFilterSearchSubject(e.target.value)}
            />

            <FiSearch
              className={classes.iconSearch}
              size={20}
              strokeWidth="2px"
              color="gray"
            ></FiSearch>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            {t("ticketPage.tb_head_ticketN")}
          </Typography>
          <Flex className={classes.positionRelative}>
            <input
              placeholder={t("ticketPage.ph_search")}
              className={classes.inputSearch}
            />

            <FiSearch
              className={classes.iconSearch}
              size={20}
              strokeWidth="2px"
              color="gray"
            ></FiSearch>
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Typography textAlign="left" margin="0 0 5px 0">
            User
          </Typography>
          <Flex className={classes.positionRelative}>
            <input
              placeholder={t("ticketPage.ph_search")}
              className={classes.inputSearch}
            />

            <FiSearch
              className={classes.iconSearch}
              size={20}
              strokeWidth="2px"
              color="gray"
            ></FiSearch>
          </Flex>
        </Flex>
      </Flex>              

      <form>
        <Table className={classes.table}>
          <TableHead>
            <TableRow style={{ background: "white" }}>
              {tableHead.map((tableHead) => (
                <TableCell
                  align="center"
                  key={tableHead.name}
                  className={classes.tableHeader}
                >
                  <Typography fontSize="0.95rem" fontWeight={600}>
                    {tableHead.name}
                  </Typography>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allTickets.map((ticket) => (
              <TableRow key={ticket.id} className={classes.tableRow}>
                <TableCell
                  component="th"
                  scope="row"
                  className={`${classes.tableCellRadiusLeft} ${classes.tableBorderBottom}`}
                  align="center"
                >
                  <Typography fontSize="0.85rem">
                    {`${ticket.dateOpen.substr(
                      0,
                      10
                    )} / ${ticket.dateOpen.substr(11, 5)} `}
                  </Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">usuário</Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">{ticket.subject}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">{ticket.status}</Typography>
                </TableCell>
                <TableCell align="center" className={classes.tableBorderBottom}>
                  <Typography fontSize="0.85rem">
                    {ticket.ticketNumber}
                  </Typography>
                </TableCell>

                <TableCell
                  align="center"
                  className={`${classes.tableCellRadiusRight} ${classes.tableBorderBottom}`}
                >
                  <Flex alignItems="center" justifyContent="space-between">
                    <Typography fontSize="0.85rem" width="100%">
                      {ticket.admin === ""
                        ? "Aguardando atendimento"
                        : ticket.admin}
                    </Typography>
                    <FiSearch
                      style={{ cursor: "pointer" }}
                      color="#494949ef"
                      size={20}
                      fontWeight={2}
                      onClick={() => handleOpenModal(ticket)}
                    />
                  </Flex>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Flex center={true} style={{ margin: "25px 0px" }}>
          <Pagination className={classes.pagination} count={totalPages} page={page} onChange={handleChange} />
        </Flex>
      </form>
    </Flex>
  );
}
export default withStyles((theme) => ({
  positionRelative: {
    position: "relative"
  },
  titlePageSupport: {
    fontWeight: 700,
    fontSize: "2rem",
    color: theme.colors.textPurple,
    margin: "0 0 50px 0",
  },
  ticketTitle: {
    margin: "25px 0",
  },
  ticketInfoContainer: {
    maxWidth: "70%",
    margin: "45px 0 0 0",
  },
  lbStatusTicket: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "35px",
    width: "100%",
    background: "#69BF41",
    padding: "5px 25px",
  },
  divider: {
    width: "1.5px",
    margin: "0 40px 0 40px",
    height: "100%",
  },
  iconSearch: {
    position: "absolute",
    right: "25px",
    top: "14px",
    opacity: "0.4",
  },
  inputSearch: {
    height: "44px",
    width: "100%",
    color: theme.colors.text,
    background: "#a8a8a863",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "0.95rem",
    margin: "3px 15px 0 0",
  },

  inputStyle: {
    height: "44px",
    color: theme.colors.text,
    background: "#a8a8a863",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    fontSize: "0.95rem",
    margin: "3px 15px 25px 0",
  },
 
  textAreaMessage: {
    padding: "15px",
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif",
    resize: "none",
    width: "100%",
    margin: "40px 0 20px 0px",
    height: "100px",
    borderRadius: "5px",
    border: "2px solid #8080805e",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "8px",
      cursor: "pointer",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  
  smallTicketImages: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    border: "1px solid #8080805e",
    marginRight: "5px",
  },

  areaMessage: {
    height: "100%",
    maxHeight: "600px",    
    padding: "35px 0 0 80px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "8px",
      cursor: "pointer",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },

  table: {
    width: "100%",
    minWidth: 700,
    borderCollapse: "collapse",
    marginTop: "30px",
  },
  tableHeader: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: theme.colors.text,
    "&:nth-child(1)": {
      borderBottomLeftRadius: "15px",
      borderTopLeftRadius: "10px",
    },
    "&:last-child": {
      borderBottomRightRadius: "15px",
      borderTopRightRadius: "10px",
    },
    borderRight: "0.8px solid #b6b6b66c",
    borderBottom: "8px solid #E5E5E5",
  },
  tableRow: {
    background: "white",
    paddingBottom: "10px",
  },

  tableCellRadiusLeft: {
    borderBottomLeftRadius: "10px",
    borderTopLeftRadius: "10px",
  },
  tableCellRadiusRight: {
    borderBottomRightRadius: "10px",
    borderTopRightRadius: "10px",
  },
  tableBorderBottom: {
    borderBottom: "4px solid #E5E5E5",
  },
  modalInfoTicket: {
    position: "relative",
    height: "850px",
    margin: "3% auto",
    background: "white",
    borderRadius: "10px",
    padding: "70px",
  },
  ticketStatusModalYellow: {
    background: "#ffde3c",
    padding: "10px"
  },
  ticketStatusModalGreen: {
    background: "#2be92b",
    padding: "10px"
  },
  userBoxText: {
    background: "#efefef",
    borderRadius: "15px",
    padding: "20px",
    margin: "0px 0 10px 0px",
    position: "relative"
  },
  supBoxText: {
    background: "#0092f940",
    borderRadius: "15px",
    padding: "20px",
    margin: "0 0px 10px 80px",
    position: "relative",
  },
  avatarSupport: {
    position: "absolute",
    top: "-20px",
    right: "-28px",
    width: theme.spacing(6),
    height: theme.spacing(6),
    background: theme.colors.textPurple,
  },
  avatarUser: {
    position: "absolute",
    top: "-20px",
    left: "-30px",
    width: theme.spacing(6),
    height: theme.spacing(6),
    background: theme.colors.textPurple,
  },
  dataInfoSup: {
    textAlign: "right",
    color: "gray"
  },
  dataInfoUser: {
    textAlign: "left",    
    color: "gray"
  },
  iconCloseModal: {
    position: "absolute",
    right: "20px",
    top: "20px",
    cursor: "pointer"
  }
  
}))(Support);

Support.propTypes = {
  classes: PropTypes.object,
};
