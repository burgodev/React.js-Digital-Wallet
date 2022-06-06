import React from "react";

import Tipografia from "./Typography";
import Flex from "./Flex";
import Card from "./Card";
import Button from "./Button";
import { Button as MuiButton, withStyles } from "@material-ui/core";
import PropTypes from "prop-types";

PropTypes.propTypes = {
  classes: PropTypes.object,
};

function Capital({ classes }) {
  return (
    <Card width="750px" height="20vh">
      <Flex center>
        {/* <Button variant="contained" borderRadius="50px" width="500px">
          Text
        </Button> */}
        <Tipografia
          margin="16px 0 0"
          width={130}
          textAlign="left"
          fontWeight={600}
        >
          Montante total de clientes
        </Tipografia>

        {/* <Button variant="contained">Confirmar</Button> */}

        {/* <Button variant="outlined">Outlined</Button> */}

        {/* <MuiButton variant="contained"> Mui Button </MuiButton> */}
      </Flex>
      {/* <Flex
        justifyContent="space-between"
        width="50%"
        style={{ marginTop: 100 }}
      >
  
        <Tipografia margin="16px 0 0" width={130} textAlign="left">
          Montante total de clientes
        </Tipografia>
      </Flex> */}
      {/* 
      <Card width="70vw" height="20vh" backgroundColor="orange">
        <Tipografia tipo="cardTitulo" textAlign="left">
          Capital
        </Tipografia>
        <Button variant="text">Text</Button>
      </Card> */}

      {/* <Flex alignItems="center" justifyContent="space-between" width="80%">
        <Flex flexDirection="column">
          <Tipografia tipo="cardTitulo" textAlign="left">
            Capital
          </Tipografia>

          <Tipografia margin="16px 0 0" width={130} textAlign="left">
            Montante total de clientes
          </Tipografia>
        </Flex>

        <Flex flexDirection="column">
          <Tipografia
            width={102}
            color="#161A31"
            opacity="0.5"
            lineHeight="18px"
          >
            Valor total disponível
          </Tipografia>
          <Tipografia
            fontSize="24px"
            lineHeight="25px"
            textAlign="left"
            color="#58D400"
            margin="16px 0 0"
          >
            R$7.000.000,00
          </Tipografia>
        </Flex>

        <Flex flexDirection="column">
          <Tipografia
            width="102px"
            color="#161A31"
            opacity="0.5"
            lineHeight="18px"
          >
            Valor total bloqueado
          </Tipografia>
          <Tipografia
            fontSize="24px"
            lineHeight="25px"
            textAlign="left"
            color="#FF0505"
            margin="16px 0 0"
          >
            R$2.000.000,00
          </Tipografia>
        </Flex>

        <Flex flexDirection="column">
          <Tipografia
            width="80px"
            color="#161A31"
            opacity="0.5"
            lineHeight="18px"
          >
            Valor total
          </Tipografia>
          <Tipografia
            fontSize="26px"
            lineHeight="31px"
            textAlign="left"
            margin="16px 0 0"
          >
            R$10.000,00
          </Tipografia>
        </Flex>
      </Flex> */}
    </Card>
  );
}

export default withStyles((theme) => ({
  themeColor: {
    background: theme.colors.text,
  },
}))(Capital);
